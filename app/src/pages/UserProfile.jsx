/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Tab, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { useDispatch, useSelector } from 'react-redux';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileFavorite from '../components/profile/ProfileFavorite';
import ProfileOwned from '../components/profile/ProfileMyOwn';
import ProfileAdminTab from '../components/profile/ProfileAdminTab';
import ProfileMyOnSale from '../components/profile/ProfileMyOnSale';
import { SIGN_MY_ITEM_RESET } from '../constants/lazyFactoryConstants';
import ProfileOrders from '../components/profile/ProfileOrders';
// import AccountUserOrders from '../components/profile/ProfileOrders';

export default function UserProfile() {
  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const userDetails = useSelector((state) => state.userDetails);
  const {
    error: errorUserDetails,
    loading: loadingUserDetails,
    success: successUserDetails,
    user,
  } = userDetails;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          textAlign: 'left',
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Grid item xs={12} md={4}>
          <img src="/static/logo.svg" alt="logo" style={{ width: '60%' }} />
          <Typography variant="body1" color="primary">
            Change you lense, change your story
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="start"
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          marginTop: 5,
          minHeight: '80vh',
        }}
      >
        <Grid item md={8} xs={12}>
          <Box sx={{ typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="My Profile" value="1" />
                  <Tab
                    label="Own"
                    value="2"
                    onClick={() => dispatch({ type: SIGN_MY_ITEM_RESET })}
                  />
                  <Tab label="On Sale" value="3" />
                  <Tab label="Transactions" value="4" />
                  <Tab label="Saves & Follows" value="5" />
                  {user && user.isAdmin && <Tab label="ADMIN" value="6" />}
                </TabList>
              </Box>

              <Box>
                <TabPanel value="1">
                  <ProfileForm />
                </TabPanel>
                <TabPanel value="2">
                  <ProfileOwned />
                </TabPanel>
                <TabPanel value="3">
                  <ProfileMyOnSale />
                </TabPanel>
                <TabPanel value="4">
                  <ProfileOrders />
                </TabPanel>
                <TabPanel value="5">
                  <ProfileFavorite />
                </TabPanel>
                <TabPanel value="6">
                  <ProfileAdminTab />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
