/* eslint-disable camelcase */
import React from 'react';
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Box,
  TextField,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.secondary.main,
    display: 'none',
  },
}));
const Root2 = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    backgroundColor: theme.palette.secondary.main,
    display: 'none',
  },
}));

const Footer = () => {
  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace } = theMarketPlace;

  return (
    <Box
      sx={{
        flexGrow: 1,
        clear: 'both',
        position: 'relative',
      }}
    >
      {marketPlace && marketPlace.contract && (
        <Root>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingRight: 10,
              paddingLeft: 10,
              backgroundColor: 'black',
              textAlign: 'left',
            }}
          >
            <Grid item xs={2}>
              <img
                src="/static/Primary-E.svg"
                alt="Logo"
                style={{ maxWidth: '35%' }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ paddingTop: 2 }} variant="subtitle1">
                CThe textbox may contain any arbitrary value, but it is
                advantageous to suggest possible values to the user,The textbox
                may contain any arbitrary value, but it is advantageous to
                suggest possible values to the usery suggest similar.
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={2}
            >
              <Grid item>
                <Typography variant="subtitle1">About Us</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Contract</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Help Center</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={2}
            >
              <Grid item>
                <Typography variant="subtitle1">Terms & Conditions</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Copyright Policy</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Privacy Policy</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Cookie Policy</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={1}
            >
              <Grid item>
                <IconButton>
                  <LinkedInIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <InstagramIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <FacebookIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={3}
            >
              <Grid item xs={2}>
                <Typography sx={{ paddingTop: 2 }} variant="subtitle1">
                  CThe textbox may contain any arbitrary value, but it is
                  advantageous to suggest possible values to the user,The
                  textbox may contain any arbitrary value,
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ marginTop: 2 }}>
                <FormControl fullWidth>
                  <form style={{ display: 'flex', width: '100%' }}>
                    <Grid item xs={8}>
                      <TextField
                        sx={{ background: 'white' }}
                        size="small"
                        fullWidth
                        label="Email"
                        id="fullWidth"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        sx={{
                          color: 'white',
                          padding: '0.5rem !important',
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Subscribe
                      </Button>
                    </Grid>
                  </form>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            sx={{ paddingLeft: 10, paddingRight: 10, backgroundColor: 'black' }}
          >
            <Grid item md={2} xs={12}>
              <img
                src="/static/logo.svg"
                alt="Logo"
                style={{ maxWidth: '50%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ paddingTop: 2 }} variant="subtitle1">
                {`@ Vadee.art ${new Date().getFullYear()}  All Rights Reserved.`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ display: 'inline-flex', margin: 'auto' }}
            >
              <Typography
                sx={{ color: 'white', marginRight: 1 }}
                variant="subtitle1"
                component="span"
              >
                $
              </Typography>
              <div>
                <img
                  src="/static/usa.png"
                  alt="Logo"
                  style={{ maxWidth: '20px' }}
                />
              </div>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'end' }}>
              <img
                src="/static/visaa.png"
                alt="Logo"
                style={{ maxWidth: '30%' }}
              />
            </Grid>
          </Grid>
        </Root>
      )}
      <Root2>
        <Grid
          sx={{ padding: 1, backgroundColor: 'black', textAlign: 'center' }}
        >
          <img src="/static/logo.svg" alt="Logo" style={{ maxWidth: '30%' }} />
        </Grid>
      </Root2>
    </Box>
  );
};

export default Footer;
