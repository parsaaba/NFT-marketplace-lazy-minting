/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchUserDetails } from '../../actions/userAction';
import Message from '../Message';
import Loader from '../Loader';
import { connectWallet, mintAndRedeem } from '../../actions/lazyFactoryAction';
import { fetchOneArtWork } from '../../actions/artworkAction';
import { fetchMarketFees } from '../../actions/marketPlaceAction';
import { ARTWORK_UPDATE_RESET } from '../../constants/artworkConstants';

function CartReview({ setTabValue, formValues }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(false);
  const [userAccountStart, setUserAccountStart] = useState();
  const [userAccountEnd, setUserAccountEnd] = useState();
  const userDetails = useSelector((state) => state.userDetails);
  const {
    error: errorUserDetails,
    loading: loadingUserDetails,
    success: successUserDetails,
  } = userDetails;

  const theArtwork = useSelector((state) => state.theArtwork);
  const { success: successArtwork, artwork } = theArtwork;

  const shippingAndFee = useSelector((state) => state.shippingAndFee);
  const { vadeeFees, success: successShippingAndFee } = shippingAndFee;

  const walletConnection = useSelector((state) => state.walletConnection);
  const {
    wallet,
    success: successWallet,
    error: errorWallet,
  } = walletConnection;

  const redeemAndMint = useSelector((state) => state.redeemAndMint);
  const {
    error: errorRedeemAndMint,
    loading: loadingRedeemAndMint,
    success: successRedeemAndMint,
  } = redeemAndMint;

  const artworkUpdate = useSelector((state) => state.artworkUpdate);
  const { success: successUpdateArtwork } = artworkUpdate;

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  useEffect(() => {
    if (!successUserDetails) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, successUserDetails, successRedeemAndMint]);

  // when no voucher
  useEffect(() => {
    if (artwork.voucher && !artwork.voucher.artwork_id) {
      history.push(`/artworks/${artwork._id}`);
    }
  }, [successArtwork, artwork]);

  // fetch artwork if not success
  useEffect(() => {
    if (cartItems[0] && cartItems[0].artworkId) {
      dispatch(fetchOneArtWork(cartItems[0].artworkId));
    }
  }, [cartItems, successRedeemAndMint]);

  // Button text
  useEffect(() => {
    if (wallet) {
      setUserAccountStart(wallet ? wallet.walletAddress.slice(0, 6) : null);
      setUserAccountEnd(wallet ? wallet.walletAddress.slice(-5) : null);
    }
  }, [dispatch]);

  useEffect(() => {
    if (successUpdateArtwork && successRedeemAndMint) {
      dispatch(fetchOneArtWork(artwork._id));
    }
  }, [successUpdateArtwork, successRedeemAndMint, artwork]);

  // change to receipt tab
  useEffect(() => {
    if (successRedeemAndMint && successUpdateArtwork) {
      setTabValue('3');
    }
  }, [successRedeemAndMint, successUpdateArtwork]);

  // fetch shipping and fee rate
  useEffect(() => {
    if (!successShippingAndFee) {
      dispatch(fetchMarketFees(artwork._id));
    }
  }, [artwork]);

  // edit
  const onEdit = () => {
    setTabValue('1');
  };

  // mint and buy
  const mintTheSignature = () => {
    dispatch({ type: ARTWORK_UPDATE_RESET });
    dispatch(
      mintAndRedeem(
        formValues,
        artwork.artist.gallery_address,
        artwork.voucher,
        vadeeFees.transaction_fee_ether
      )
    );
  };

  return (
    <div>
      <Paper sx={{ padding: 2 }} elevation={0}>
        <Grid container direction="row" alignItems="flex-start" spacing={2}>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              Full Name:
            </Typography>
            <Typography component="span">{formValues.firstName}</Typography>
            <Typography component="span">{formValues.lastName}</Typography>
          </Grid>
          <Grid item xs={4} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              Country:
            </Typography>
            <Typography component="span">{formValues.country}</Typography>
          </Grid>

          <Grid item xs={4} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              Province:
            </Typography>
            <Typography component="span">{formValues.province}</Typography>
          </Grid>
          <Grid item xs={4} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              City:
            </Typography>
            <Typography component="span">{formValues.city}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              Address:
            </Typography>
            <Typography component="span">{formValues.address}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              Postal Code:
            </Typography>
            <Typography component="span">{formValues.postalCode}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Typography variant="subtitle1" component="span">
              Phone:
            </Typography>
            <Typography component="span">{formValues.phoneNumber}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ width: '100%', marginTop: 0 }}>
            <Button
              variant="contained"
              sx={{ width: '100%', marginTop: 2, marginBottom: 4 }}
              onClick={onEdit}
            >
              Edit
            </Button>
            {successWallet ? (
              <LoadingButton
                variant="custom"
                disabled={isDisabled}
                loading={loadingRedeemAndMint}
                color="primary"
                sx={{ width: '100%' }}
                onClick={
                  !successWallet
                    ? () => dispatch(connectWallet())
                    : () => mintTheSignature()
                }
              >
                Purchase by
                <Typography
                  sx={{ fontWeight: 'bolder', paddingRight: 1, paddingLeft: 1 }}
                  variant="body2"
                >
                  {userAccountStart}...{userAccountEnd}
                </Typography>
              </LoadingButton>
            ) : (
              <Button
                variant="custom"
                color="primary"
                sx={{ width: '100%' }}
                onClick={() => dispatch(connectWallet())}
              >
                Connect Wallet
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
      {(errorUserDetails || errorWallet || errorRedeemAndMint) && (
        <Message severity="error">
          {errorUserDetails || errorWallet || errorRedeemAndMint}
        </Message>
      )}
      {loadingUserDetails && <Loader />}
    </div>
  );
}

export default CartReview;
