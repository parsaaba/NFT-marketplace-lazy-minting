/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Typography,
  CardActionArea,
  Button,
  Box,
  Container,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchAllArtWorks, fetchCategories } from '../actions/artworkAction';
import { cleanLocalCart } from '../actions/cartAction';
import { ARTWORK_DETAILS_RESET } from '../constants/artworkConstants';
import CarouselTop from '../components/carousel/CarouselTop';
import Loader from '../components/Loader';
import CarouselCategories from '../components/carousel/CarouselCategories';
import CarouselCategory from '../components/carousel/CarouselCategory';
import CarouselArtistList from '../components/carousel/CarouselArtistList';
import {
  deployMarketPlace,
  fetchMarketPlace,
} from '../actions/marketPlaceAction';

const priceFilter = [
  'Under $500',
  'Under $1000',
  'Under $2000',
  'Under $5000',
  'Under $10000',
  'Under $15000',
  'Under $20000',
];
const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [lastArtwork, setLastArtwork] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  const artworksList = useSelector((state) => state.artworks);
  const { artworks, loading: loadingArtworks } = artworksList;

  const marketPlaceDeployment = useSelector(
    (state) => state.marketPlaceDeployment
  );
  const { loading: loadingMarketDeploy, success: successMarketDeploy } =
    marketPlaceDeployment;

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace } = theMarketPlace;

  const keyword = history.location.search;

  // loading IconButton
  useEffect(() => {
    if (loadingArtworks) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingArtworks]);

  // artworks
  useEffect(() => {
    dispatch(fetchAllArtWorks(keyword));
    dispatch(fetchMarketPlace());
  }, [dispatch, keyword, successMarketDeploy]);

  useEffect(() => {
    dispatch(cleanLocalCart());
    dispatch({ type: ARTWORK_DETAILS_RESET });
    return () => {
      dispatch(cleanLocalCart());
    };
  }, [dispatch]);

  //  categories
  useEffect(() => {
    if (!successCategories) {
      dispatch(fetchCategories());
    }
  }, [successCategories, dispatch, history]);

  useEffect(() => {
    if (artworks && artworks[0]) {
      const theLastArtwork = artworks[artworks.length - 1];
      setLastArtwork(theLastArtwork);
    }
  }, [artworks]);

  return (
    <>
      {!marketPlace || !marketPlace.contract ? (
        <Grid sx={{ margin: 'auto', textAlign: 'center' }}>
          <LoadingButton
            loading={loadingMarketDeploy}
            onClick={() => dispatch(deployMarketPlace())}
            variant="contained"
          >
            Deploy Market Place
          </LoadingButton>
        </Grid>
      ) : (
        <Grid sx={{ minHeight: '100vh' }}>
          {isLoading ? (
            <Grid container>
              <Loader />
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ color: '#A2A28F' }}
            >
              <Grid item xs={12} sx={{ width: '100%', marginBottom: 2 }}>
                {artworks && <CarouselTop artworks={artworks} />}
              </Grid>

              {/* photographers */}
              <Container
                maxWidth="100%"
                sx={{
                  backgroundColor: '#d1d3c8',
                  padding: '0 !important',
                  margin: '0 !important',
                }}
              >
                <Container maxWidth="xl" sx={{ padding: '10 !important' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    // alignItems="center"
                    sx={{
                      minHeight: '25vh',
                      marginTop: 2,
                    }}
                  >
                    <Grid item xs={2} sx={{ marginTop: 2, color: 'black' }}>
                      <Typography variant="h6">Photographers</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ marginTop: 2 }}>
                      <CarouselArtistList artistId={1} />
                    </Grid>
                  </Grid>
                </Container>
              </Container>

              {/* Categories */}
              <Container maxWidth="xl" sx={{ padding: '10 !important' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  sx={{
                    width: '95%',
                    marginBottom: 8,
                  }}
                >
                  <Grid item xs={1} sx={{ marginTop: 8 }}>
                    <Typography variant="h6">Featured</Typography>
                    <Typography variant="h6">Categories</Typography>
                  </Grid>
                  {successCategories && (
                    <Grid item xs={9} sx={{ marginTop: 6, maxHeight: 200 }}>
                      <CarouselCategories categories={categories} />
                    </Grid>
                  )}
                  {/* Categories */}
                  <Grid item xs={12}>
                    <Box
                      component="div"
                      sx={{
                        p: 2,
                        width: '100%',
                        border: '1px solid #A2A28F',
                        overflowX: 'hidden',
                        marginTop: 5,
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <Grid item xs={2}>
                          <Typography variant="subtitle1">Start</Typography>
                          <Typography variant="subtitle1">Explore</Typography>
                        </Grid>
                        {categories &&
                          categories.map((category, index) => (
                            <Button
                              key={index}
                              color="primary"
                              sx={{ textTransform: 'none !important' }}
                            >
                              {category.name}
                            </Button>
                          ))}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Container>

              {/* Last artwork */}
              {lastArtwork && (
                <Container maxWidth="xl" sx={{ padding: '10 !important' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    // alignItems="center"
                    sx={{
                      color: 'white',
                      backgroundColor: 'black',
                      minHeight: '30vh',
                      width: '100%',
                      padding: 5,
                    }}
                  >
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">Last</Typography>
                      <Typography variant="subtitle2">Artwork</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h3">
                        {lastArtwork.artist.firstName}{' '}
                        {lastArtwork.artist.lastName}
                      </Typography>
                      <Typography variant="h6">{lastArtwork.title}</Typography>
                      <br />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          padding: 0,
                          margin: 0,
                          lineHeight: 1,
                          fontSize: '0.8rem',
                        }}
                      >
                        <Link
                          style={{ color: 'white' }}
                          to={`/artworks/${lastArtwork._id}`}
                        >
                          Browse work
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Card sx={{ maxWidth: 250, maxHeight: 130 }}>
                        <CardActionArea
                          onClick={() =>
                            history.push(`artworks/${lastArtwork._id}`)
                          }
                        >
                          <img
                            style={{ height: '100%', width: '100%' }}
                            srcSet={lastArtwork.image}
                            alt=""
                            loading="lazy"
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grid>
                </Container>
              )}
              <Container maxWidth="xl" sx={{ padding: '10 !important' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  sx={{
                    width: '95%',
                    marginBottom: 8,
                  }}
                >
                  {/* Categories */}
                  <Grid item xs={12}>
                    <Box
                      component="div"
                      sx={{
                        p: 2,
                        width: '100%',
                        border: '1px solid #A2A28F',
                        overflowX: 'hidden',
                        marginTop: 5,
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <Grid item xs={2}>
                          <Typography variant="subtitle1">Shop By</Typography>
                          <Typography variant="subtitle1">Price</Typography>
                        </Grid>
                        {priceFilter.map((priceCat, index) => (
                          <Button
                            key={index}
                            color="primary"
                            sx={{ textTransform: 'none !important' }}
                          >
                            {priceCat}
                          </Button>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Container>

              {/* Talented photographer */}
              {lastArtwork && (
                <Container maxWidth="xl" sx={{ padding: '10 !important' }}>
                  <Card>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      sx={{
                        minHeight: '30vh',
                        width: '100%',
                        padding: 5,
                      }}
                    >
                      <Grid item xs={12} md={5}>
                        <Typography variant="h6">
                          Talented Photographer
                        </Typography>

                        <Typography variant="h3">
                          {lastArtwork.artist.firstName}{' '}
                          {lastArtwork.artist.lastName}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: 10,
                            marginBottom: 5,
                            fontSize: '0.8rem',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            maxHeight: '400px',
                            whiteSpace: 'normal',
                            // Addition lines for 2 line or multiline ellipsis
                            display: ' -webkit-box !important',
                            WebkitLineClamp: 8,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {lastArtwork.artist.biography}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            padding: 0,
                            margin: 0,
                            lineHeight: 1,
                            fontSize: '0.9rem',
                            fontWeight: 'bolder',
                          }}
                        >
                          <Link
                            style={{ color: 'black' }}
                            to={`/artworks/${lastArtwork._id}`}
                          >
                            Browse work
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <CardActionArea
                          onClick={() =>
                            history.push(`artworks/${lastArtwork._id}`)
                          }
                        >
                          <img
                            style={{
                              height: '100%',
                              width: '100%',
                              padding: 20,
                            }}
                            srcSet={lastArtwork.image}
                            alt=""
                            loading="lazy"
                          />
                        </CardActionArea>
                      </Grid>
                    </Grid>
                  </Card>
                </Container>
              )}
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                sx={{
                  minHeight: '35vh',
                  width: '100%',
                }}
              >
                <Grid item xs={1} sx={{ marginTop: 8 }}>
                  <Typography variant="h6">Street</Typography>
                  <Typography variant="h6">Category</Typography>
                </Grid>
                <Grid item xs={9} sx={{ marginTop: 6, maxHeight: 300 }}>
                  <CarouselCategory />
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  marginTop: 8,
                  backgroundColor: '#EDEEE9',
                  minHeight: '20vh',
                  width: '100%',
                }}
              >
                <Grid item>
                  <Typography color="primary" variant="h2">
                    Ready to join?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button color="secondary" variant="contained">
                    Join
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                sx={{
                  minHeight: '35vh',
                  width: '100%',
                }}
              >
                <Grid item xs={1} sx={{ marginTop: 8 }}>
                  <Typography variant="h6">Street</Typography>
                  <Typography variant="h6">Category</Typography>
                </Grid>
                <Grid item xs={9} sx={{ marginTop: 6, maxHeight: 300 }}>
                  <CarouselCategory />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Main;
