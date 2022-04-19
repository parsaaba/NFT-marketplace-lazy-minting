import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Menu,
  Checkbox,
  Box,
  TextField,
  MenuItem,
  ListItemIcon,
  Divider,
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
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Message from '../Message';
import { login, logout, register } from '../../actions/userAction';

export default function AccountMenu({ anchorEl, setAnchorEl }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search
    ? // eslint-disable-next-line no-restricted-globals
      location.search.split('redirect=')[1]
    : '/artworks';

  const [loginDialogue, setLoginDialogue] = useState(false);
  const [registerDialogue, setRegisterDialogue] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const open = Boolean(anchorEl);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, success, userInfo } = userLogin;

  // close dialogues if logged in
  useEffect(() => {
    if (success) {
      setLoginDialogue(false);
      setRegisterDialogue(false);
    } else if (redirect === '/login') {
      // e.g. cart button need auth
      setLoginDialogue(true);
    }
  }, [success, location, redirect]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // login
  const handleCloseLogin = () => {
    setLoginDialogue(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  // register
  const handleCloseRegister = (e) => {
    e.preventDefault();
    setRegisterDialogue(false);
  };
  const handleRegister = () => {
    dispatch(
      register(values.firstName, values.lastName, values.email, values.password)
    );
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
  // log out
  const handleLogOut = () => {
    dispatch(logout());
  };

  // value change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // show password
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!userInfo ? (
          <div>
            <MenuItem onClick={() => setLoginDialogue(true)}>Login</MenuItem>
            <MenuItem onClick={() => setRegisterDialogue(true)}>
              Register
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => history.push('/users/profile')}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={() => handleLogOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        )}
      </Menu>
      <div>
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
        {/* Register dialogue */}
        <Dialog open={registerDialogue} onClose={handleCloseRegister}>
          <Box
            sx={{
              maxWidth: 450,
              minHeight: 400,
            }}
          >
            <form onSubmit={handleRegister}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Grid
                  item
                  xs={10}
                  sx={{ marginTop: 2, marginBottom: 2, textAlign: 'center' }}
                >
                  <img
                    src="/static/logo.svg"
                    alt="Paella dish"
                    style={{ width: '60%', marginTop: 20 }}
                  />
                  <Typography variant="subtitle1" color="primary">
                    Change you lense, change your story
                  </Typography>
                </Grid>
                <Grid item xs={10} sx={{ margin: 1, width: '100%' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <TextField
                      id="first-name"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange('firstName')}
                      label="First name"
                      variant="outlined"
                      fullWidth
                      sx={{ borderRadius: '10px' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={10} sx={{ margin: 1, width: '100%' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <TextField
                      id="last-name"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange('lastName')}
                      label="Last name"
                      variant="outlined"
                      fullWidth
                      sx={{ borderRadius: '10px' }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={10} sx={{ margin: 1, width: '100%' }}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
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
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={10}
                  container
                  direction="row"
                  sx={{ margin: 1, width: '100%' }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      sx={{ width: '100%' }}
                      variant="outlined"
                      required
                    >
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleCheck}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label={
                        <Typography component="span">
                          "I agree on the
                          <Typography component="span" color="secondary">
                            Terms of Use Privacy Policy Conditions
                          </Typography>
                          and to receiving emails from VADEE"
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <LoadingButton
                      type="submit"
                      loading={loading}
                      variant="contained"
                      color="secondary"
                      sx={{ width: '100%', marginBottom: 2 }}
                    >
                      Register
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
                      <Link to="#" onClick={handleSwitchToLgin}>
                        <Typography variant="subtitle1" color="primary">
                          Already have an account?
                          <Typography
                            variant="subtitle1"
                            component="span"
                            color="secondary"
                          >
                            Sign in
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
      </div>
    </>
  );
}

AccountMenu.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func.isRequired,
};
