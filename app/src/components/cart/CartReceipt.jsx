/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Typography, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { fetchUserDetails } from '../../actions/userAction';
import Message from '../Message';
import Loader from '../Loader';

function CartReceipt({ setTabValue, formValues }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    error: errorUserDetails,
    loading: loadingUserDetails,
    success: successUserDetails,
  } = userDetails;

  const theArtwork = useSelector((state) => state.theArtwork);
  const { success: successArtwork, artwork } = theArtwork;

  const artworkUpdate = useSelector((state) => state.artworkUpdate);
  const { updated } = artworkUpdate;

  const redeemAndMint = useSelector((state) => state.redeemAndMint);
  const {
    error: errorRedeemAndMint,
    loading: loadingRedeemAndMint,
    success: successRedeemAndMint,
  } = redeemAndMint;

  useEffect(() => {
    if (!successUserDetails) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, successUserDetails, successRedeemAndMint]);

  // when no formValues
  useEffect(() => {
    if (!formValues) {
      setTabValue('1');
    }
  }, [successArtwork, artwork]);

  useEffect(() => {
    if (!successRedeemAndMint) {
      history.push(`/artworks/${artwork._id}`);
    }
  }, [successRedeemAndMint]);

  return (
    <div>
      {formValues && (
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
              <Typography>
                Your Order was created at: {updated && updated.order.created_at}
              </Typography>
              <Link
                href={`https://rinkeby.etherscan.io/tx/${updated.order.transaction_hash}`}
                target="blank"
              >
                {updated && updated.order.transaction_hash}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      )}

      {(errorUserDetails || errorRedeemAndMint) && (
        <Message severity="error">
          {errorUserDetails || errorRedeemAndMint}
        </Message>
      )}
      {loadingUserDetails && <Loader />}
    </div>
  );
}

export default CartReceipt;
