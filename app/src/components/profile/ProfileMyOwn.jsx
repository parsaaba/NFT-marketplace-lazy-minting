/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import {
  Grid,
  Paper,
  Hidden,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Loader from '../Loader';
import Message from '../Message';
import { fetchArtistWorks, fetchUserDetails } from '../../actions/userAction';
import { DEPLOY_MY_GALLERY_RESET } from '../../constants/lazyFactoryConstants';
import {
  fetchEthPrice,
  fetchMarketPlace,
} from '../../actions/marketPlaceAction';
import { deployMyGallery } from '../../actions/lazyFactoryAction';
import ProfileMyOwnCards from './ProfileMyOwnCards';

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

function ProfileMyOwn() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [galleryName, setGalleryName] = useState('');
  const [artistGalleryAddress, setArtistGalleryAddress] = useState('');

  const walletConnection = useSelector((state) => state.walletConnection);
  const { error: errorWallet } = walletConnection;

  const myWorks = useSelector((state) => state.myWorks);
  const {
    error: errorMyWorks,
    loading: loadingMyWorks,
    success: successMyWork,
  } = myWorks;

  const voucherDelete = useSelector((state) => state.voucherDelete);
  const { success: successDeleteVoucher } = voucherDelete;

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace } = theMarketPlace;

  const deployGallery = useSelector((state) => state.deployGallery);
  const {
    loading: loadingDeployGallery,
    success: successDeployGallery,
    error: errorDeployGallery,
  } = deployGallery;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const myVoucher = useSelector((state) => state.myVoucher);
  const { success: successSignature, error: errorSignature } = myVoucher;

  // loading button
  useEffect(() => {
    if (loadingDeployGallery) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingDeployGallery]);

  // disable button when form is not filled
  useEffect(() => {
    if (!galleryName) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [galleryName]);

  useEffect(() => {
    dispatch(fetchMarketPlace());
    dispatch(fetchArtistWorks());
    dispatch(fetchEthPrice());
  }, [dispatch, successSignature, successDeleteVoucher]);

  // contract address and factory
  useEffect(() => {
    if (user && user.artist.gallery_address) {
      setArtistGalleryAddress(user.artist.gallery_address);
    }
  }, [user, successDeployGallery]);

  // update artist
  useEffect(() => {
    if (successDeployGallery) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, successDeployGallery]);

  // my gallery deployment
  const handleGalleryDeployment = () => {
    console.log(user.artist._id);
    dispatch({ type: DEPLOY_MY_GALLERY_RESET });
    dispatch(
      deployMyGallery(marketPlace.contract, galleryName, user.artist._id)
    );
  };

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
          {user && !user.artist.gallery_address ? (
            <Grid item sx={{ margin: 10, textAlign: 'center' }}>
              <Typography sx={{ margin: 2 }}>
                Hey, {user.artist.firstName} create your gallery to get started!
              </Typography>
              <TextField
                color="secondary"
                value={galleryName}
                type="text"
                onChange={(e) => setGalleryName(e.target.value)}
                label="Permanent Gallery Name"
                sx={{ margin: 'auto' }}
                size="small"
              />
              <LoadingButton
                variant="contained"
                color="primary"
                disabled={isDisabled}
                loading={isLoading}
                onClick={handleGalleryDeployment}
                sx={{ margin: 'auto', padding: 1 }}
              >
                Create My Gallery
              </LoadingButton>
            </Grid>
          ) : (
            <>
              <Grid container direction="row" spacing={0}>
                <Typography variant="subtitle2">
                  Gallery Address:
                  <Link
                    href={`https://rinkeby.etherscan.io/address/${artistGalleryAddress}`}
                    target="blank"
                  >
                    {artistGalleryAddress}
                  </Link>
                </Typography>
                <Grid item xs={9} className={classes.root}>
                  <ImageList
                    // variant="masonry"
                    cols={3}
                    gap={30}
                    sx={{ paddingRight: 5 }}
                  >
                    {myWorks.works.my_artworks.map((artwork) => (
                      <ProfileMyOwnCards key={artwork._id} artwork={artwork} />
                    ))}
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
                            <ProfileMyOwnCards
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
          )}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            {(errorDeployGallery || errorSignature || errorWallet) && (
              <Message severity="error">
                {errorDeployGallery || errorSignature || errorWallet}
              </Message>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default ProfileMyOwn;
