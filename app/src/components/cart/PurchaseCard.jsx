/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import { CircularProgress } from '@mui/material';
import { fetchMarketFees } from '../../actions/marketPlaceAction';
import { fetchOneArtWork } from '../../actions/artworkAction';
import { weiToEth } from '../../converter';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    marginTop: window.innerWidth > 900 ? 130 : 20,
    marginBottom: 50,
  },
  media: {
    minHeight: 100,
  },
}));

export default function PurchaseCard() {
  const { workId } = useParams();
  const dispatch = useDispatch();

  const [priceEth, setPriceEth] = useState();
  const [totalPriceEth, setTotalPriceEth] = useState();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const shippingAndFee = useSelector((state) => state.shippingAndFee);
  const { vadeeFees, success: successShippingAndFee } = shippingAndFee;

  const theArtwork = useSelector((state) => state.theArtwork);
  const { artwork, success: successArtwork } = theArtwork;

  useEffect(() => {
    if (
      cartItems &&
      cartItems[0] &&
      workId &&
      (!successShippingAndFee || !successArtwork)
    ) {
      dispatch(fetchMarketFees(workId));
      dispatch(fetchOneArtWork(workId));
    }
  }, [cartItems, workId, dispatch]);

  // convert artwork price from Wei to Eth price
  useEffect(() => {
    if (artwork && artwork.voucher && artwork.voucher.artwork_id) {
      const convertedPrice = weiToEth(artwork.voucher.price_wei);
      setPriceEth(convertedPrice);
    }
  }, [artwork]);

  useEffect(() => {
    if (priceEth && vadeeFees) {
      console.log('now');
      setTotalPriceEth(
        parseFloat(vadeeFees.artwork_price_ether) +
          parseFloat(vadeeFees.shipping_price_ether)
      );
    }
  }, [priceEth, vadeeFees]);

  const classes = useStyles();
  return (
    <Grid>
      {!artwork ||
      !artwork.voucher ||
      !cartItems[0] ||
      !successShippingAndFee ||
      !vadeeFees ||
      !totalPriceEth ? (
        <Paper className={classes.root} elevation={0} square>
          <CircularProgress />
        </Paper>
      ) : (
        <Paper className={classes.root} elevation={0} variant="outlined" square>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{
              padding: 3,
              ':hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Grid item xs={5}>
              <Grid item>
                <img
                  src={`${cartItems[0].image}`}
                  alt="Art work"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Grid>
            </Grid>
            <Grid item xs={7} sx={{ padding: 1 }}>
              <Grid item>
                <Typography variant="h6">
                  {cartItems[0].firstName} {cartItems[0].lastName}
                </Typography>
                <Typography variant="subtitle1">
                  {cartItems[0].title}
                </Typography>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="flex-end"
                sx={{
                  borderTop: '1px solid #e0e0e0',
                  marginTop: 5,
                }}
              >
                <Grid container sx={{ marginTop: 1 }}>
                  <Grid item xs>
                    <Typography variant="body1">Price</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="body2">
                      {artwork.voucher.artwork_id &&
                        `Ξ  ${parseFloat(vadeeFees.artwork_price_ether).toFixed(
                          4
                        )}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: 1 }}>
                  <Grid item xs>
                    <Typography variant="body1">Shipping</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="body2">
                      {artwork.voucher.artwork_id &&
                        `Ξ  ${parseFloat(
                          vadeeFees.shipping_price_ether
                        ).toFixed(4)}`}
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Grid container sx={{ marginTop: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body1">Service fee</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2">
                      {artwork.voucher.artwork_id && `Ξ  ${feeEth}`}
                    </Typography>
                  </Grid>
                </Grid> */}
                <Grid container sx={{ marginTop: 1 }}>
                  <Grid item xs>
                    <Typography variant="body1">Total</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="body2">
                      {totalPriceEth && `Ξ  ${totalPriceEth.toFixed(4)}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}
