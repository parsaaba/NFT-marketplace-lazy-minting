/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import {
  Grid,
  Box,
  Paper,
  Hidden,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import ArtCard from '../components/ArtCard';
import { fetchAllArtWorks, fetchCategories } from '../actions/artworkAction';
import { cleanLocalCart } from '../actions/cartAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ARTWORK_DETAILS_RESET } from '../constants/artworkConstants';
import SideFilter from '../components/SideFilter';
import { fetchArticlesList } from '../actions/articleAction';
import { filterByRegion } from '../actions/filterAction';
import { fetchArtistList } from '../actions/artistAction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  responsive: {
    // margin: 40,
    // width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

function ArtworksList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(true);

  const favArtwork = useSelector((state) => state.favArtwork);
  const { artworkId } = favArtwork;

  const artworksList = useSelector((state) => state.artworks);
  const { error, loading, artworks, pages } = artworksList;

  const articlesList = useSelector((state) => state.articlesList);
  const { articles, success: successArticles } = articlesList;

  const filterOrigin = useSelector((state) => state.filterOrigin);
  const { origins, success: successOrigins } = filterOrigin;

  const artistList = useSelector((state) => state.artistList);
  const { artists, success: successArtistList } = artistList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, success: successCategories } = categoryList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(fetchAllArtWorks(keyword));
    if (!successArticles) {
      dispatch(fetchArticlesList());
    }
  }, [dispatch, keyword, artworkId, successArticles]);

  // clean up
  useEffect(() => {
    dispatch(cleanLocalCart());
    dispatch({ type: ARTWORK_DETAILS_RESET });
    return () => {
      dispatch(cleanLocalCart());
    };
  }, [dispatch]);

  //  filter
  useEffect(() => {
    if (!successOrigins) {
      dispatch(filterByRegion());
    }
    if (!successArtistList) {
      dispatch(fetchArtistList());
    }
    if (!successCategories) {
      dispatch(fetchCategories());
    }
  }, [successOrigins, successArtistList, successCategories, dispatch, history]);

  useEffect(() => {}, [successArtistList, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
    if (keyword) {
      keyword = keyword.split('?keyword=')[1].split('&')[0]; // example: ?keyword=اکبر&page=1  ===> اکبر
    }
    history.push(`/artworks/?keyword=${keyword}&page=${value}`);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const classes = useStyles();

  return (
    <div style={{ minHeight: '100vh' }}>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {successArticles && articles[0] && (
            <Paper className={classes.paper} elevation={0}>
              <Grid container direction="row">
                <Grid xs={12} sm={2} item>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {articles[0].title}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={8} md={6} item>
                  <Typography variant="body1">{articles[0].content}</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          <Grid container direction="row">
            <Grid item xs sx={{ marginTop: 0 }}>
              <Divider style={{ margin: 'auto' }} variant="middle" />
              <FormControlLabel
                label="On Sale"
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
              />
              {origins && origins.origins && (
                <SideFilter
                  title="Region"
                  list={origins.origins}
                  kind="artworks"
                />
              )}
              {artists && artists[0] && (
                <SideFilter title="Artist" list={artists} kind="artworks" />
              )}
              {categories && categories[0] && (
                <SideFilter title="Genres" list={categories} kind="artworks" />
              )}
              {artists && artists[0] && (
                <SideFilter title="Price" list={artists} kind="artworks" />
              )}
            </Grid>
            <Grid item xs={10} className={classes.root}>
              <Box sx={{ overflowY: 'hidden' }}>
                <Divider style={{ marginBottom: 30 }} variant="middle" />
                <ImageList
                  variant="masonry"
                  cols={window.innerWidth < 800 ? 2 : 3}
                  gap={30}
                  sx={{ paddingRight: 5 }}
                >
                  {artworks && checked
                    ? artworks.map(
                        (artwork) =>
                          artwork.edition_number <= artwork.edition_total &&
                          artwork.on_market && (
                            <ArtCard key={artwork._id} data={artwork} />
                          )
                      )
                    : artworks.map((artwork) => (
                        <ArtCard key={artwork._id} data={artwork} />
                      ))}
                </ImageList>
              </Box>
              <Grid>
                {pages > 1 && (
                  <Pagination
                    count={pages}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="secondary"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Hidden smUp>
              <Grid container>
                <Paper className={classes.responsive} elevation={0}>
                  {artworks &&
                    artworks.map((artwork) => (
                      <Grid key={artwork._id}>
                        {artwork.on_market && checked && (
                          <Paper className={classes.paper}>
                            <ArtCard data={artwork} />
                          </Paper>
                        )}
                      </Grid>
                    ))}
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      )}
      {error ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Message
              variant="outlined"
              severity="error"
              sx={{ margin: 'auto' }}
            >
              {error}
            </Message>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
}

export default ArtworksList;
