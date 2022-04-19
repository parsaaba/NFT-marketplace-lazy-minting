/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Slider from 'react-slick';
import { Typography, Box, CardContent, Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'block',
        color: 'white',
        opacity: '30%',
        margin: 2,
        fontWeight: '0.05rem',
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
        display: 'block',
        color: 'transparent',
        margin: 2,
      }}
      onClick={onClick}
    />
  );
}

export default class CarouselExhibition extends Component {
  render() {
    const settings = {
      dots: false,
      speed: 500,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
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
      <>
        <Slider {...settings}>
          {itemData.map((item) => (
            <Card sx={{ display: 'flex !important' }} elevation={0}>
              <CardMedia
                sx={{ width: 140, height: 100 }}
                image={item.img}
                title="Contemplative Reptile"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent
                  sx={{ flex: '1 0 auto', paddingLeft: 2, paddingTop: 4 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      padding: 0,
                      margin: 0,
                      lineHeight: 1,
                      color: 'black',
                    }}
                  >
                    Artist name
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      padding: 0,
                      margin: 0,
                      lineHeight: 1,
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    The exhibition title
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      padding: 0,
                      margin: 0,
                      lineHeight: 1,
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    Online exclusive, July 12 - July 14
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      padding: 0,
                      margin: 0,
                      lineHeight: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    <Link style={{ color: '#A2A28F' }} to="#">
                      Browse Gallery
                    </Link>
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Slider>
      </>
    );
  }
}
