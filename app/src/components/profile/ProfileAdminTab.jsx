import React, { useState, useEffect } from 'react';
import { Paper, Grid, TextField, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  fetchMarketBalance,
  fetchMarketPlace,
  marketWithdrawAll,
} from '../../actions/marketPlaceAction';
import Message from '../Message';

const ProfileAdminTab = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace, loading: loadingMarketPlace } = theMarketPlace;

  const marketPlaceBalance = useSelector((state) => state.marketPlaceBalance);
  const {
    marketBalance,
    loading: loadingMarketBalance,
    error: errorBalance,
  } = marketPlaceBalance;

  const marketWithdraw = useSelector((state) => state.marketWithdraw);
  const { error: errorWithdraw } = marketWithdraw;

  useEffect(() => {
    dispatch(fetchMarketPlace());
  }, [dispatch]);

  // loading button
  useEffect(() => {
    if (loadingMarketPlace || loadingMarketBalance) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingMarketPlace, loadingMarketBalance]);

  return (
    <Grid item sx={{ margin: 10, textAlign: 'center' }}>
      {!marketPlace || !marketPlace.contract ? (
        <Grid sx={{ margin: 'auto', textAlign: 'center' }}>
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <Grid>
          <Grid>
            <LoadingButton
              variant="contained"
              color="primary"
              disabled={isDisabled}
              loading={isLoading}
              onClick={() => dispatch(fetchMarketBalance(marketPlace.contract))}
              sx={{ margin: 'auto', padding: 1 }}
            >
              {marketPlaceBalance ? marketBalance : 'MarketPlace Balance'}
            </LoadingButton>
          </Grid>
          <Grid>
            <LoadingButton
              variant="contained"
              color="primary"
              disabled={isDisabled}
              loading={isLoading}
              onClick={() => dispatch(marketWithdrawAll(marketPlace.contract))}
              sx={{ margin: 'auto', padding: 1 }}
            >
              Withdraw
            </LoadingButton>
          </Grid>
        </Grid>
      )}
      {(errorBalance || errorWithdraw) && (
        <Message severity="error">{errorBalance || errorWithdraw}</Message>
      )}
    </Grid>
  );
};

export default ProfileAdminTab;
