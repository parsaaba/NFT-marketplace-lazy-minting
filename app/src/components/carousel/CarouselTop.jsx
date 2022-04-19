/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import { Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/carouselTop.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        color: 'black',
        margin: 5,
        right: window.innerWidth < 600 ? -10 : -80,
        position: 'absolute',
        opacity: '10%',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowBackIosNewIcon
      fontSize="large"
      className={className}
      style={{
        display: 'none',
        color: 'black',
        margin: 2,
        left: 0,
      }}
      onClick={onClick}
    />
  );
}

export default function CarouselTop({ artworks }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <Slider {...settings}>
        {artworks.map(
          (artwork, index) =>
            artwork.is_carousel && (
              <div className="images" key={index}>
                <img
                  src={`${artwork.image}`}
                  alt={artwork.title}
                  loading="lazy"
                  style={{ minWidth: '100%', height: '600px' }}
                />
                <Grid container>
                  <Typography component="p" variant="body2">
                    Vadee Collection
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {artwork.artist.firstName} {artwork.artist.lastName}
                  </Typography>
                  <Typography variant="h4" component="h4">
                    {artwork.title}
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    <Link to={`artworks/${artwork._id}`}>Browse Works</Link>
                  </Typography>
                </Grid>
              </div>
            )
        )}
      </Slider>
    </div>
  );
}

CarouselTop.propTypes = {
  artworks: PropTypes.array.isRequired,
};
