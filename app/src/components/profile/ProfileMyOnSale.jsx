/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import { Grid, Paper, Hidden } from '@mui/material';
import Loader from '../Loader';
import Message from '../Message';
import { fetchArtistWorks, fetchUserDetails } from '../../actions/userAction';
import ProfileMyOnSaleCards from './ProfileMyOnSaleCards';

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

function ProfileMyOnSale() {
  const dispatch = useDispatch();

  const walletConnection = useSelector((state) => state.walletConnection);
  const { error: errorWallet } = walletConnection;

  const myWorks = useSelector((state) => state.myWorks);
  const {
    error: errorMyWorks,
    loading: loadingMyWorks,
    success: successMyWork,
  } = myWorks;

  const deployGallery = useSelector((state) => state.deployGallery);
  const { success: successDeployGallery, error: errorDeployGallery } =
    deployGallery;

  // update artist
  useEffect(() => {
    if (successDeployGallery) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, successDeployGallery]);

  useEffect(() => {
    dispatch(fetchArtistWorks());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div style={{ minHeight: '100vh' }}>
      {!successMyWork || !myWorks || !myWorks.works || loadingMyWorks ? (
        <Loader />
      ) : errorMyWorks ? (
        <Message variant="outlined" severity="info">
          {errorMyWorks}
        </Message>
      ) : (
        <div>
          <>
            <Grid container direction="row" spacing={0}>
              <Grid item xs={9} className={classes.root}>
                <ImageList
                  // variant="masonry"
                  cols={3}
                  gap={30}
                  sx={{ paddingRight: 5 }}
                >
                  {myWorks.works.my_artworks.map(
                    (artwork) =>
                      artwork.on_market && (
                        <ProfileMyOnSaleCards
                          key={artwork._id}
                          artwork={artwork}
                        />
                      )
                  )}
                </ImageList>
              </Grid>
            </Grid>
            <Grid>
              <Hidden mdUp>
                <Grid container>
                  <Paper className={classes.responsive} elevation={0}>
                    {myWorks.works.my_artworks.map((artwork) => (
                      <Grid key={artwork._id}>
                        <Paper className={classes.paper}>
                          <ProfileMyOnSaleCards
                            key={artwork._id}
                            artwork={artwork}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Paper>
                </Grid>
              </Hidden>
            </Grid>
          </>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            {(errorDeployGallery || errorWallet) && (
              <Message severity="error">
                {errorDeployGallery || errorWallet}
              </Message>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default ProfileMyOnSale;
