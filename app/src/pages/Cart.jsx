/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Tab, Grid, Typography, Container } from '@mui/material';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CartShipForm from '../components/cart/CartShipForm';
import CartReceipt from '../components/cart/CartReceipt';
import PurchaseCard from '../components/cart/PurchaseCard';
import CartReview from '../components/cart/CartReview';

export default function Cart() {
  const [tabValue, setTabValue] = useState('1');
  const [formValues, setFormValues] = useState();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        sx={{
          textAlign: 'left',
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
        direction="row-reverse"
        justifyContent="center"
        sx={{
          marginTop: 2,
          minHeight: '80vh',
        }}
      >
        <Grid item md={4} xs={10}>
          <PurchaseCard />
        </Grid>
        <Grid item md={8} xs={12}>
          <Box sx={{ typography: 'body1', padding: 5 }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab tabs">
                  <Tab disabled={tabValue !== '1'} label="Shipping" value="1" />
                  <Tab disabled={tabValue !== '2'} label="Review" value="2" />
                  <Tab
                    disabled={tabValue !== '3'}
                    label="Order Receipt"
                    value="3"
                  />
                </TabList>
              </Box>

              <Box>
                <TabPanel value="1">
                  <CartShipForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    setTabValue={setTabValue}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <CartReview
                    setTabValue={setTabValue}
                    formValues={formValues}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <CartReceipt
                    setTabValue={setTabValue}
                    formValues={formValues}
                  />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
