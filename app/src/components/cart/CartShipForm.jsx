/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchUserDetails, updateUserProfile } from '../../actions/userAction';
import Message from '../Message';
import Loader from '../Loader';
import {
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConstants';

function CartShipForm({ setTabValue, formValues, setFormValues }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [checked, setChecked] = React.useState(true);

  const userDetails = useSelector((state) => state.userDetails);
  const {
    error: errorUserDetails,
    loading: loadingUserDetails,
    success: successUserDetails,
    user,
  } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate } = userUpdateProfile;

  const theCart = useSelector((state) => state.theCart);
  const { success: successCart } = theCart;

  useEffect(() => {
    if (successUpdate && formValues) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setTabValue('2');
    }
  }, [successUpdate]);

  useEffect(() => {
    const cartItemFromStorage = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    if (!successUserDetails && !cartItemFromStorage) {
      history.push(`/artworks`);
    }
  }, [userInfo, history, successCart, successUserDetails]);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    country: Yup.string().required('Please enter your country'),
    city: Yup.string().required('Please enter your city'),
    province: Yup.string().required('Please enter your city'),
    phoneNumber: Yup.string().required('Please enter your phone number'),
    postalCode: Yup.string().required('Please enter your postal code'),
    address: Yup.string().required('Please enter your address'),
    // username: Yup.string()
    //   .required('Username is required')
    //   .min(6, 'Username must be at least 6 characters')
    //   .max(20, 'Username must not exceed 20 characters'),
    // email: Yup.string().required('Email is required').email('Email is invalid'),
    // password: Yup.string()
    //   .required('Password is required')
    //   .min(6, 'Password must be at least 6 characters')
    //   .max(40, 'Password must not exceed 40 characters'),
    // confirmPassword: Yup.string()
    //   .required('Confirm Password is required')
    //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(
      updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        country: checked && data.country,
        city: checked && data.city,
        province: checked && data.province,
        phoneNumber: checked && data.phoneNumber,
        postalCode: checked && data.postalCode,
        address: checked && data.address,
        checked,
      })
    );
    setFormValues({
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      city: data.city,
      province: data.province,
      phoneNumber: data.phoneNumber,
      postalCode: data.postalCode,
      address: data.address,
    });
  };

  return (
    <div>
      {successUserDetails && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Paper sx={{ padding: 2 }} elevation={0}>
            <Grid container direction="row" alignItems="flex-start" spacing={2}>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.firstName}
                  control={control}
                  label="First Name"
                  margin="none"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  {...register('firstName')}
                  error={!!errors.firstName}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.lastName}
                  label="Last Name"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('lastName')}
                  error={!!errors.lastName}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.country}
                  label="Country"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('country')}
                  error={!!errors.country}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.city}
                  label="City"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('city')}
                  error={!!errors.city}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.province}
                  label="Province"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('province')}
                  error={!!errors.province}
                />
              </Grid>

              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.postalCode}
                  label="Postal Code"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('postalCode')}
                  error={!!errors.postalCode}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.address}
                  label="Address"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('address')}
                  error={!!errors.address}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  defaultValue={user.phoneNumber}
                  label="Phone"
                  margin="none"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  {...register('phoneNumber')}
                  error={!!errors.phoneNumber}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      control={control}
                      name="acceptTerms"
                      inputRef={register()}
                      render={({ field: { onChange } }) => (
                        <Checkbox
                          checked={checked}
                          color="primary"
                          type="checkbox"
                          {...register('checkbox')}
                          onChange={(e) =>
                            onChange(setChecked(e.target.checked))
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <Typography
                      color={errors.acceptTerms ? 'error' : 'inherit'}
                    >
                      save shipping address
                    </Typography>
                  }
                />
                <br />
                <Typography variant="inherit" color="textSecondary">
                  {errors.acceptTerms ? `${errors.acceptTerms.message}` : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%', marginTop: 5 }}>
                <Button
                  variant="custom"
                  color="primary"
                  type="submit"
                  sx={{ width: '100%' }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}

      {errorUserDetails && (
        <Message severity="error">{errorUserDetails}</Message>
      )}
      {loadingUserDetails && <Loader />}
    </div>
  );
}

export default CartShipForm;
