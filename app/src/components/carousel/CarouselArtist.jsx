/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Typography, Grid, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchArtistList } from '../../actions/artistAction';

export default function CarouselArtist() {
  const dispatch = useDispatch();

  const artistList = useSelector((state) => state.artistList);
  const { error, loading, artists, success } = artistList;

  useEffect(() => {
    if (!success) {
      dispatch(fetchArtistList());
    }
  }, [success, dispatch]);

  const settings = {
    className: 'center',
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {success &&
        artists.map((artist, index) => (
          <Grid
            key={index}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              display: 'flex !important',
              border: '1px solid #A2A28F',
              maxWidth: '200px',
            }}
          >
            <Grid item xs>
              <img
                style={{
                  margin: 0,
                  maxWidth: '60px',
                  maxHeight: '60px',
                }}
                src={artist.photo}
                alt="artist"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle2">
                {artist && `${artist.firstName} ${artist.lastName}`}
              </Typography>
              <Typography>
                {artist && `${artist.nationality}, ${artist.birthday}`}
              </Typography>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#A2A28F',
                  color: 'black',
                  lineHeight: '0.4rem',
                  '&:hover': {
                    backgroundColor: 'black',
                  },
                }}
                fullWidth
                // disabled={disabled}
              >
                Follow
              </Button>
            </Grid>
          </Grid>
        ))}
    </Slider>
  );
}
