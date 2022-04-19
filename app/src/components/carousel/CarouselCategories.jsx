/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import {
  Typography,
  Grid,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <ArrowForwardIosIcon
      fontSize="large"
      className={className}
      style={{
        display: 'block',
        color: 'black',
        margin: 5,
        right: window.innerWidth < 900 ? -50 : -80,
        top: '90px',
        position: 'absolute',
        opacity: '10%',
      }}
      onClick={onClick}
    />
  );
}

export default function CarouselCategories({ categories }) {
  const settings = {
    className: 'center',
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,

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
    <>
      <div>
        <Slider {...settings}>
          {categories.map(
            (category, index) =>
              category.is_featured && (
                <Grid
                  className="mid-images"
                  key={index}
                  sx={{ padding: 2, textAlign: 'left' }}
                >
                  <Card sx={{ width: 260 }} elevation={0}>
                    <CardActionArea>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={category.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            padding: 0,
                            margin: 0,
                            lineHeight: 1,
                            color: 'black',
                          }}
                        >
                          {category.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
          )}
        </Slider>
      </div>
    </>
  );
}
CarouselCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};
