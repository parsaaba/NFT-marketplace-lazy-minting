/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { favArtwork } from '../actions/userAction';

export default function ArtCard({ data }) {
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  // favorite artworks
  useEffect(() => {
    if (user) {
      for (let i = 0; i < data.favorites.length; i++) {
        if (data.favorites[i] === user._id) {
          setIsFav(true);
        } else {
          setIsFav(true);
        }
      }
    }
  }, [user, data]);

  return (
    <Grid
      sx={{
        marginBottom: 5,
        opacity: 0.8,
        ':hover': {
          opacity: 1,
        },
      }}
    >
      <ImageListItem style={{ color: '#666666' }}>
        <ImageListItemBar
          style={{ background: 'transparent' }}
          actionPosition="right"
          actionIcon={
            data.artist ? (
              <IconButton
                onClick={() => dispatch(favArtwork(data._id))}
                aria-label={`star ${data.title}`}
                style={{ zIndex: 10, bottom: '70px' }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />}
              </IconButton>
            ) : (
              <IconButton
                // onClick={() => dispatch(favArtwork(data._id))}
                aria-label={`star ${data.title}`}
                style={{ zIndex: 10, bottom: '70px' }}
              >
                {/* {isFav ? <FavoriteIcon /> : <FavoriteBorder color="primary" />} */}
              </IconButton>
            )
          }
        />
        {data.artist ? (
          <Link
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            to={`/artworks/${data._id}`}
          />
        ) : (
          <Link
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            to={`/artists/${data._id}`}
          />
        )}
        {data.artist ? (
          <img
            srcSet={`${data.image}?w=161&fit=crop&auto=format 1x,
                  ${data.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={data.title}
            loading="lazy"
          />
        ) : (
          <img
            srcSet={`${data.photo}?w=161&fit=crop&auto=format 1x,
                ${data.photo}?w=161&fit=crop&auto=format&dpr=2 2x`}
            alt={data.firstName}
            loading="lazy"
          />
        )}
        {data.artist ? (
          <Typography variant="h6">
            {data.artist.firstName} {data.artist.lastName}
          </Typography>
        ) : (
          <Typography variant="h6">
            {data.firstName} {data.lastName}
          </Typography>
        )}
        {data.artist ? (
          <Typography variant="subtitle1" sx={{ width: '100%', margin: 0 }}>
            {data.title}
          </Typography>
        ) : (
          <Typography variant="subtitle1" sx={{ width: '100%', margin: 0 }}>
            {data.nationality}
          </Typography>
        )}
        {data.artist && (
          <Typography variant="subtitle1" sx={{ width: '100%', margin: 0 }}>
            ${data.price}
          </Typography>
        )}
      </ImageListItem>
    </Grid>
  );
}

ArtCard.propTypes = {
  data: PropTypes.object.isRequired, // artist or artwork
};
