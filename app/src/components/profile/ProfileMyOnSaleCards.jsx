/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchOneArtWork } from '../../actions/artworkAction';
import { fetchMarketFees } from '../../actions/marketPlaceAction';

export default function ProfileMyOwnCard({ artwork }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (artwork) {
      dispatch(fetchOneArtWork(artwork._id));
    }
  }, [dispatch, artwork]);

  return (
    <Paper
      sx={{ border: '1px solid black', position: 'relative' }}
      elevation={5}
    >
      <Grid
        sx={{
          opacity: 0.8,
          ':hover': {
            opacity: 1,
          },
        }}
      >
        {artwork && (
          <ImageListItem style={{ color: '#666666' }}>
            <Link
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              to={`/artworks/${artwork._id}`}
            />

            <img
              srcSet={`${artwork.image}?w=161&fit=crop&auto=format 1x,
                    ${artwork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={artwork.title}
              loading="lazy"
            />
            <Typography
              variant="subtitle2"
              sx={{ width: '100%', margin: 'auto', textAlign: 'center' }}
            >
              {artwork.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                width: '100%',
                margin: 'auto',
                marginBottom: 5,
                textAlign: 'center',
              }}
            >
              {`$ ${artwork.price.toLocaleString()}`}
            </Typography>
          </ImageListItem>
        )}
      </Grid>
    </Paper>
  );
}

ProfileMyOwnCard.propTypes = {
  artwork: PropTypes.object,
};
