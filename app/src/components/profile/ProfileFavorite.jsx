/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import { Grid, Paper, Hidden } from '@mui/material';
import ArtCard from '../ArtCard';
import Loader from '../Loader';
import Message from '../Message';
import { fetchFavArtworkList } from '../../actions/userAction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    paddingTop: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

function FavoriteList() {
  const dispatch = useDispatch();

  const favArtworkList = useSelector((state) => state.favArtworkList);
  const { error, loading, success, favArtworks } = favArtworkList;

  const favArtwork = useSelector((state) => state.favArtwork);
  const { artworkId } = favArtwork;

  useEffect(() => {
    dispatch(fetchFavArtworkList());
  }, [dispatch, artworkId]);

  const classes = useStyles();

  return (
    <div style={{ minHeight: '100vh' }}>
      {!success || loading ? (
        <Loader />
      ) : error ? (
        <Message variant="outlined" severity="error">
          {error}
        </Message>
      ) : (
        <>
          <Grid container direction="row" spacing={0}>
            <Grid item xs={9} className={classes.root}>
              <ImageList
                variant="masonry"
                cols={3}
                gap={30}
                sx={{ paddingRight: 5 }}
              >
                {favArtworks.favorites.map((artwork) => (
                  <ArtCard key={artwork._id} data={artwork} />
                ))}
              </ImageList>
            </Grid>
          </Grid>
          <Grid>
            <Hidden mdUp>
              <Grid container>
                <Paper className={classes.responsive} elevation={0}>
                  {favArtworks.favorites.map((artwork) => (
                    <Grid key={artwork._id}>
                      <Paper className={classes.paper}>
                        <ArtCard data={artwork} />
                      </Paper>
                    </Grid>
                  ))}
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
        </>
      )}
    </div>
  );
}

export default FavoriteList;
