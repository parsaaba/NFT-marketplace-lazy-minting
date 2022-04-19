/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { fetchUserDetails, updateUserProfile } from '../../actions/userAction';
import Message from '../Message';
import Loader from '../Loader';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const useStyles = makeStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: 'secondary',
      borderColor: 'cyan',
    },
    '& .MuiFilledInput': {
      backgroundColor: 'green',
    },
    '& .MuiFilledInputInput-root': {
      '& fieldset': {
        borderColor: 'cyan',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'cyan',
      },
    },
  },
}));

function ProfileForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    phoneNumber: '',
    postalCode: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  // value change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  // useEffect(() => {
  //   const cartItemFromStorage = localStorage.getItem('cartItems')
  //     ? JSON.parse(localStorage.getItem('cartItems'))
  //     : [];

  //   if (!successUserDetails && !cartItemFromStorage) {
  //     history.push(`/artworks`);
  //   } else if (cartItemFromStorage[0]) {
  //     history.push(`/artworks/${cartItemFromStorage[0].artworkId}`);
  //   }
  // }, [userInfo, history, successUserDetails]);

  useEffect(() => {
    if (!successUserDetails || successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(fetchUserDetails());
    } else {
      setValues({
        ...values,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        city: user.city,
        phoneNumber: user.phoneNumber,
        postalCode: user.postalCode,
        address: user.address,
        email: user.email,
      });
    }
  }, [dispatch, history, userInfo, user, successUserDetails, successUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    if (values.password === values.confirmPassword) {
      dispatch(
        updateUserProfile({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        })
      );
    }
  };

  const classes = useStyles();

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className={classes.root}>
        <Paper sx={{ padding: 2 }} elevation={0}>
          <Grid container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <TextField
                label="First Name"
                name="firstName"
                value={values.firstName || ''}
                margin="none"
                variant="outlined"
                sx={{ width: '100%' }}
                placeholder="Please enter your name"
                onChange={handleChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <TextField
                label="Last Name"
                name="lastName"
                value={values.lastName || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={handleChange('lastName')}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <TextField
                label="Country"
                name="country"
                value={values.country || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={handleChange('country')}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <TextField
                label="City"
                name="city"
                value={values.city || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={handleChange('city')}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <TextField
                label="Phone"
                name="phoneNumber"
                value={values.phoneNumber || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={handleChange('phoneNumber')}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <TextField
                label="Postal Code"
                name="postalCode"
                value={values.postalCode || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={handleChange('postalCode')}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%' }}>
              <TextField
                label="Address"
                name="address"
                value={values.address || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                onChange={handleChange('address')}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%' }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={values.email || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%' }}>
              <TextField
                label="Password"
                name="password"
                value={values.password || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                type="password"
                onChange={handleChange('password')}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%' }}>
              <TextField
                label="Repeat Password"
                name="re-password"
                value={values.password || ''}
                margin="none"
                sx={{ width: '100%' }}
                variant="outlined"
                type="password"
                onChange={handleChange('re-password')}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', marginTop: 5 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '100%' }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
      {errorUserDetails && (
        <Message severity="error">{errorUserDetails}</Message>
      )}
      {loadingUserDetails && <Loader />}
    </div>
  );
}

export default ProfileForm;
