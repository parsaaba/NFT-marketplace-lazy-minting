/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Hidden from '@mui/material/Hidden';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Button, Container, Divider } from '@mui/material';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchOneArtWork } from '../actions/artworkAction';
import { addToCart } from '../actions/cartAction';
import Dialog from '../components/Dialog';
import TheTab from '../components/TheTab';
import { favArtwork, fetchUserDetails } from '../actions/userAction';
import CarouselArtistArtworks from '../components/carousel/CarouselArtistArtworks';
import RelatedCategory from '../components/carousel/RelatedCategory';
import CarouselArtist from '../components/carousel/CarouselArtist';
import { ARTIST_LIST_RESET } from '../constants/artistConstants';
import {
  ARTWORK_DETAILS_RESET,
  ARTWORK_UPDATE_RESET,
} from '../constants/artworkConstants';
import {
  MINT_AND_REDEEM_RESET,
  SIGN_MY_ITEM_RESET,
} from '../constants/lazyFactoryConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    marginBottom: 100,
  },
  container: {
    display: 'grid',
  },
  paper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '16px',
    marginLeft: theme.spacing(2),
  },
}));

// match params has the id from the router /:workId
function Artwork() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { workId } = useParams();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [priceEth, setPriceEth] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const theArtwork = useSelector((state) => state.theArtwork);
  const {
    error,
    loading: loadingArtwork,
    success: successArtwork,
    artwork,
  } = theArtwork;

  const theCart = useSelector((state) => state.theCart);
  const { loading: loadingCart, success: successCart } = theCart;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, success: successUserDetails } = userDetails;

  // loading button
  useEffect(() => {
    if (loadingCart) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCart]);

  // check user auth
  useEffect(() => {
    dispatch(fetchUserDetails());
    history.replace(`/artworks/${workId}`);
  }, [dispatch, userInfo]);

  // user favorite artwork + reset artist works
  useEffect(() => {
    dispatch({ type: ARTIST_LIST_RESET });
    if (user && successArtwork) {
      for (let i = 0; i < artwork.favorites.length; i += 1) {
        if (artwork.favorites[i] === user._id) {
          setIsFav(true);
        } else {
          setIsFav(true);
        }
      }
    }
  }, [user, artwork, successArtwork, dispatch]);

  // fetch artwork if not success
  useEffect(() => {
    if (workId) {
      dispatch(fetchOneArtWork(workId));
    }
    return () => {
      dispatch({ type: ARTWORK_DETAILS_RESET });
    };
  }, [dispatch, workId]);

  // quantity = 0
  useEffect(() => {
    if (artwork && artwork.quantity < 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [artwork]);

  // convert price to ETH
  useEffect(() => {
    if (artwork && artwork.voucher && artwork.voucher.artwork_id) {
      const convertedPrice = ethers.utils.formatEther(
        artwork.voucher.price_wei
      );
      setPriceEth(convertedPrice);
    }
  }, [artwork]);

  const onAddToCart = () => {
    dispatch({ type: MINT_AND_REDEEM_RESET });
    dispatch({ type: ARTWORK_UPDATE_RESET });
    dispatch({ type: SIGN_MY_ITEM_RESET });

    dispatch(addToCart(workId));
    history.push(`/cart/shippingAddress/${workId}?title=${artwork.title}`);
  };

  const classes = useStyles();
  const renderElement = () => (
    <Container maxWidth="lg">
      {artwork && artwork.price && (
        <>
          <Grid container direction="row" justifyContent="flex-start">
            <Grid
              container
              justifyContent="flex-end"
              alignItems={window.innerWidth < 600 ? 'center' : 'flex-end'}
              direction="column"
              item
              xs={12}
              md={1}
              sx={{ marginLeft: 3 }}
            >
              <Button
                size="small"
                onClick={() => dispatch(favArtwork(artwork._id))}
                sx={{
                  fontSize: 15,
                  textTransform: 'none',
                }}
              >
                {isFav ? 'Save' : 'UnSave'}
              </Button>
              <Button
                size="small"
                sx={{
                  fontSize: 15,
                  textTransform: 'none',
                }}
                onClick={() => dispatch(favArtwork(artwork._id))}
              >
                Share
              </Button>
            </Grid>
            <Grid item xs sx={{ textAlign: 'center', margin: 'auto' }}>
              <Paper className={classes.paper} elevation={1}>
                <img
                  onLoad={() => setIsImageLoading(true)}
                  src={`${artwork.image}`}
                  alt="Art work"
                  style={{ width: '100%', maxWidth: '500px' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper} elevation={1}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={3} md={2}>
                    <img
                      style={{ maxWidth: '75%', marginTop: 5 }}
                      src={artwork.artist && artwork.artist.photo}
                      alt="artist"
                    />
                  </Grid>
                  <Grid item xs={6} md>
                    <Typography variant="subtitle2">
                      {artwork.artist &&
                        `${artwork.artist.firstName} ${artwork.artist.lastName}`}
                    </Typography>
                    <Typography>
                      {artwork.artist &&
                        `${artwork.artist.origin}, ${artwork.artist.birthday}`}
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
                      disabled={isDisabled}
                    >
                      Follow
                    </Button>
                  </Grid>
                </Grid>
                <Grid>
                  <Divider
                    className={classes.divider}
                    style={{ marginTop: 20, marginBottom: 20 }}
                  />
                  <Typography color="#666666" variant="h6">
                    {artwork.title}
                  </Typography>
                  <Typography color="#666666" variant="body2">
                    {artwork.subtitle}
                  </Typography>
                  <Typography color="#666666" variant="body2">
                    {artwork.year}
                  </Typography>
                  <Typography color="#666666" variant="body2">
                    {artwork.medium}
                  </Typography>
                  <Typography color="#666666" variant="body2">
                    {artwork.unit === '0' && ' in '}
                    {artwork.unit === '1' && ' cm '}
                    {!artwork.unit && ' cm '}
                    <span
                      style={{
                        position: 'absolute',
                        direction: 'ltr',
                        paddingRight: 2,
                      }}
                    >
                      {artwork.width} x {artwork.height}
                    </span>
                  </Typography>
                  {artwork.edition_number > 0 && (
                    <Typography variant="body2">
                      {artwork.edition_number} from {artwork.edition_total}
                    </Typography>
                  )}
                  <Typography color="#666666" variant="body2">
                    {`${
                      !artwork.is_sold_out
                        ? artwork.edition_total - artwork.edition_number + 1
                        : 0
                    } Remaining`}
                  </Typography>
                </Grid>
                <Divider
                  className={classes.divider}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />
                <Typography
                  variant="body2"
                  style={{ marginTop: 30, marginBottom: 30 }}
                >
                  <span style={{ position: 'absolute' }}>
                    {artwork.voucher.artwork_id
                      ? ` Ξ  ${priceEth}`
                      : `$ ${artwork.price.toLocaleString()}`}
                  </span>
                </Typography>
                {!artwork.is_sold_out && artwork.voucher.signature && (
                  <LoadingButton
                    loading={isLoading}
                    onClick={
                      successUserDetails
                        ? (e) => onAddToCart(e)
                        : () =>
                            history.push(`/artworks/${workId}?redirect=/login`)
                    }
                    variant={!successUserDetails ? 'outlined' : 'contained'}
                    type="submit"
                    fullWidth
                    disabled={isDisabled}
                  >
                    {successUserDetails
                      ? 'Purchase Artwork'
                      : 'Login To Purchase'}
                  </LoadingButton>
                )}

                <Link to="/">
                  <Typography variant="subtitle2">{artwork.name}</Typography>
                </Link>
                <Typography variant="subtitle1" color="#666666">
                  <RoomOutlinedIcon />
                  {artwork.art_location}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="#666666"
                  style={{ display: 'flex' }}
                >
                  <MilitaryTechOutlinedIcon />
                  <Dialog />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="baseline"
          >
            <Hidden mdDown>
              <Grid item xs={1} sx={{ position: 'relative', marginLeft: 3 }}>
                <Typography variant="subtitle2" sx={{ marginTop: 5 }}>
                  {artwork && artwork.artist && `${artwork.artist.firstName}`}{' '}
                  <br />
                  {artwork &&
                    artwork.artist &&
                    `${artwork.artist.lastName}`}{' '}
                  <br />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#A2A28F',
                      color: 'black',
                      marginTop: 1,
                      lineHeight: '0.4rem',
                      '&:hover': {
                        backgroundColor: 'black',
                      },
                    }}
                    disabled={isDisabled}
                  >
                    Follow
                  </Button>
                </Typography>
              </Grid>
            </Hidden>
            <Grid item xs={10} sx={{ marginLeft: 4 }}>
              <TheTab artist={artwork.artist} />
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
                {artwork && artwork.artist && (
                  <CarouselArtistArtworks artistId={artwork.artist._id} />
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
                {artwork && artwork.artist && (
                  <CarouselArtistArtworks artistId={artwork.artist._id} />
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
                {artwork && artwork.artist && <CarouselArtist />}
              </Grid>
            </Grid>
          </Hidden>
        </>
      )}
    </Container>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {loadingArtwork ? (
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

export default Artwork;
