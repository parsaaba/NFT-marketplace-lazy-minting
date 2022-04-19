/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { signMyItem } from '../../actions/lazyFactoryAction';
import { deleteVoucher, fetchOneArtWork } from '../../actions/artworkAction';
import { ARTWORK_UPDATE_RESET } from '../../constants/artworkConstants';
import { dollarToEth, weiToEth } from '../../converter';
import { fetchMarketFees } from '../../actions/marketPlaceAction';

export default function ProfileMyOnSaleCard({ artwork }) {
  const dispatch = useDispatch();

  const [artistGalleryAddress, setArtistGalleryAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [priceEth, setPriceEth] = useState();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const myVoucher = useSelector((state) => state.myVoucher);
  const {
    voucher,
    loading: loadingSignature,
    success: successSignature,
  } = myVoucher;

  const artworkUpdate = useSelector((state) => state.artworkUpdate);
  const { success: successUpdateArtwork } = artworkUpdate;

  const shippingAndFee = useSelector((state) => state.shippingAndFee);
  const { vadeeFees, success: successShippingAndFee } = shippingAndFee;

  // loading button
  useEffect(() => {
    if (loadingSignature) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingSignature]);

  // disable button before fetching ETH price
  useEffect(() => {
    if (successShippingAndFee) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [successShippingAndFee]);

  // fetch shipping and fee rate
  useEffect(() => {
    if (!successShippingAndFee) {
      dispatch(fetchMarketFees(artwork._id));
    }
  }, [artwork]);

  // set gallery address
  useEffect(() => {
    if (user && user.artist.gallery_address) {
      setArtistGalleryAddress(user.artist.gallery_address);
    }
  }, [user, artwork, successUpdateArtwork, dispatch]);

  useEffect(() => {
    if (successSignature && voucher.artworkId === artwork._id) {
      dispatch(fetchOneArtWork(artwork._id));
    }
  }, [dispatch, successSignature, artwork, voucher]);

  // set price
  useEffect(() => {
    if (successShippingAndFee && artwork.voucher.price_wei) {
      const totalEthPrice = weiToEth(artwork.voucher.price_wei);
      setPriceEth(parseFloat(totalEthPrice).toFixed(4));
    }
    if (!artwork.voucher.price_wei) {
      setPriceEth(artwork.price);
    }
  }, [artwork, successShippingAndFee, vadeeFees]);

  // handle signature
  const handleSignature = async () => {
    dispatch({ type: ARTWORK_UPDATE_RESET });
    if (artistGalleryAddress && vadeeFees) {
      dispatch(
        signMyItem(
          artistGalleryAddress,
          artwork,
          vadeeFees.artwork_price_ether,
          vadeeFees.shipping_price_ether,
          artwork.price,
          vadeeFees.shipping_price_dollar,
          user.firstName
        )
      );
    }
  };

  return (
    <Paper
      sx={{ border: '1px solid black', position: 'relative' }}
      elevation={5}
    >
      <Grid
        sx={{
          opacity: 0.8,
          ':hover': {
            opacity: 1,
          },
        }}
      >
        {successShippingAndFee && artwork && priceEth && (
          <ImageListItem style={{ color: '#666666' }}>
            <Link
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              to={`/artworks/${artwork._id}`}
            />

            <img
              srcSet={`${artwork.image}?w=161&fit=crop&auto=format 1x,
                    ${artwork.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={artwork.title}
              loading="lazy"
            />
            <Typography
              variant="subtitle2"
              sx={{ width: '100%', margin: 'auto', textAlign: 'center' }}
            >
              {artwork.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                width: '100%',
                margin: 'auto',
                textAlign: 'center',
              }}
            >
              {artwork.voucher.artwork_id
                ? ` Ξ  ${parseFloat(vadeeFees.artwork_price_ether).toFixed(4)}`
                : `$ ${artwork.price.toLocaleString()}`}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                width: '100%',
                margin: 'auto',
                marginBottom: 5,
                textAlign: 'center',
              }}
            >
              shipping:
              {artwork.voucher.artwork_id
                ? ` Ξ  ${parseFloat(vadeeFees.shipping_price_ether).toFixed(4)}`
                : `$ ${vadeeFees.shipping_price_dollar.toLocaleString()}`}
            </Typography>
          </ImageListItem>
        )}
      </Grid>
      <LoadingButton
        disabled={isDisabled}
        loading={isLoading}
        size="small"
        onClick={
          artwork && !artwork.voucher.signature
            ? () => handleSignature()
            : () => dispatch(deleteVoucher(artwork.voucher._id))
        }
        sx={{ position: 'absolute', bottom: 0, width: '100%' }}
        variant={!artwork.voucher.signature ? 'contained' : 'outlined'}
      >
        {!artwork.voucher.signature ? (
          'Sign to Sell'
        ) : (
          <HighlightOffIcon color="error" />
        )}
      </LoadingButton>
    </Paper>
  );
}

ProfileMyOnSaleCard.propTypes = {
  artwork: PropTypes.object,
};
