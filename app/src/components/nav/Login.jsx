import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material/';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Message from '../Message';
import { login } from '../../actions/userAction';

export default function LoginDialog({ anchorEl, setAnchorEl }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loginDialogue, setLoginDialogue] = useState(false);

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const open = Boolean(anchorEl);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, success, userInfo } = userLogin;

  // value change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // login
  const handleCloseLogin = () => {
    setLoginDialogue(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  // show password
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // Don't have an account?
  const handleSwitchToRegister = () => {
    setLoginDialogue(false);
    setRegisterDialogue(true);
  };

  // Already have an account?
  const handleSwitchToLgin = () => {
    setLoginDialogue(true);
    setRegisterDialogue(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* Login dialogue */}
      <Dialog open={loginDialogue} onClose={handleCloseLogin}>
        <Box
          sx={{
            maxWidth: 450,
            minHeight: 400,
          }}
        >
          <form onSubmit={handleLogin}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={10} sx={{ marginTop: 2, textAlign: 'center' }}>
                <img
                  src="/static/logo.svg"
                  alt="Logo"
                  style={{ width: '60%', margin: 20 }}
                />
                <Typography variant="subtitle2">Login</Typography>
              </Grid>
              <Grid item xs={10} sx={{ margin: 2, width: '100%' }}>
                <TextField
                  id="email-login"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{ borderRadius: '10px' }}
                  required
                />
              </Grid>
              <Grid
                item
                xs={10}
                container
                direction="row"
                sx={{ margin: 1, width: '100%' }}
              >
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 1, marginBottom: 1 }}>
                  <Link to="#">
                    <Typography variant="subtitle1" color="primary">
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 4 }}>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    variant="contained"
                    color="secondary"
                    sx={{ width: '100%', marginBottom: 2 }}
                  >
                    Login
                  </LoadingButton>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      marginTop: 1,
                      marginBottom: 1,
                      textAlign: 'center',
                    }}
                  >
                    <Link to="#" onClick={handleSwitchToRegister}>
                      <Typography variant="subtitle1" color="primary">
                        Don't have an account?
                        <Typography
                          variant="subtitle1"
                          component="span"
                          color="secondary"
                        >
                          Sign up
                        </Typography>
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              {error && (
                <Grid sx={{ marginTop: 2 }}>
                  <Message variant="" severity="error">
                    {error}
                  </Message>
                </Grid>
              )}
            </Grid>
          </form>
        </Box>
      </Dialog>
    </>
  );
}

LoginDialog.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};
