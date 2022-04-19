/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Hidden from '@mui/material/Hidden';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Typography, Button, Container, Divider } from '@mui/material';
import { Link, useHistory, useParams } from 'react-router-dom';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchOneArtWork } from '../actions/artworkAction';
import { addToCart } from '../actions/cartAction';
import Dialog from '../components/Dialog';
import TheTab from '../components/TheTab';
import { favArtwork } from '../actions/userAction';
import CarouselArtistArtworks from '../components/carousel/CarouselArtistArtworks';
import RelatedCategory from '../components/carousel/RelatedCategory';
import CarouselArtist from '../components/carousel/CarouselArtist';
import {
  ARTIST_BY_ID_RESET,
  ARTIST_LIST_RESET,
} from '../constants/artistConstants';
import { fetchArtistById } from '../actions/artistAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: 100,
    marginBottom: 100,
  },
  container: {
    display: 'grid',
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    marginLeft: theme.spacing(2),
  },
}));

// match params has the id from the router /:workId
function Artist() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artistId } = useParams();

  const [disabled, setDisabled] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const theArtist = useSelector((state) => state.theArtist);
  const { error, loading, success, artist } = theArtist;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (!success) {
      dispatch(fetchArtistById(artistId));
    }
  }, [success, dispatch, artistId]);

  //   user favorite artist + reset artist works
  useEffect(() => {
    // dispatch({ type: ARTIST_BY_ID_RESET });
    // dispatch({ type: ARTIST_LIST_RESET });
    // if (user && success) {
    //   for (let i = 0; i < artist.favorites.length; i += 1) {
    //     if (artist.favorites[i] === user._id) {
    //       setIsFav(true);
    //     } else {
    //       setIsFav(true);
    //     }
    //   }
    // }
  }, [user, artist, success, dispatch]);

  // fetch artist if not success
  useEffect(() => {
    if (!success && artistId) {
      dispatch(fetchOneArtWork(artistId));
    }
  }, [dispatch, artistId, success]);

  // quantity = 0
  useEffect(() => {
    if (artist && artist.quantity < 1) {
      setDisabled(true);
    }
  }, [artist]);

  const classes = useStyles();

  const renderElement = () => (
    <Container maxWidth="lg">
      {artist && (
        <>
          <Grid container direction="row" justifyContent="flex-start">
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ padding: 2 }}
            >
              <Hidden>
                <Grid item xs={12} sm={8} md={1}>
                  <img
                    style={{ maxWidth: '100%', marginTop: 5 }}
                    src={artist.details.photo}
                    alt="artist"
                  />
                  <Typography variant="subtitle2">
                    {artist &&
                      `${artist.details.firstName} ${artist.details.lastName}`}
                  </Typography>
                  <Typography>
                    {artist.details.origin} {artist.details.birthday}
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
                    disabled={disabled}
                  >
                    Follow
                  </Button>
                </Grid>
              </Hidden>
              <Grid item xs={12} md sx={{ marginLeft: 4 }}>
                <TheTab artist={artist.details} />
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={1}>
                <Typography variant="subtitle1">Artists</Typography>
                <Typography variant="subtitle1">Artworks</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  marginLeft: 4,
                }}
              >
                {artist && artist.details && (
                  <CarouselArtistArtworks artistId={artist.details._id} />
                )}
              </Grid>
            </Grid>
            <Grid sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <RelatedCategory />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={1}>
                <Typography variant="subtitle1">Similar</Typography>
                <Typography variant="subtitle1">Works</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  marginLeft: 4,
                }}
              >
                {artist && artist.details && (
                  <CarouselArtistArtworks artistId={artist.details._id} />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                marginTop: 8,
              }}
            >
              <Grid item sm={1}>
                <Typography variant="subtitle1">Similar</Typography>
                <Typography variant="subtitle1">Works</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                sx={{
                  marginLeft: 4,
                }}
              >
                <CarouselArtist />
              </Grid>
            </Grid>
          </Hidden>
        </>
      )}
    </Container>
  );

  return (
    <div className={classes.root}>
      <Grid container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="outlined" severity="error">
            {error}
          </Message>
        ) : (
          renderElement()
        )}
      </Grid>
    </div>
  );
}

export default Artist;
