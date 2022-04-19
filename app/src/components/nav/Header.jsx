import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import { fetchMarketPlace } from '../../actions/marketPlaceAction';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // marginTop: 4,
  color: 'inherit',
  border: 'solid 1px #A2A28F',
  height: 35,
  width: '98%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [current, setCurrent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isHeader, setIsHeader] = useState(true);

  const theMarketPlace = useSelector((state) => state.theMarketPlace);
  const { marketPlace } = theMarketPlace;

  useEffect(() => {
    if (
      location.pathname === '/users/profile' ||
      location.pathname.includes('/cart/shippingAddress/')
    ) {
      setIsHeader(false);
    } else {
      setIsHeader(true);
    }
  }, [location, history]);

  useEffect(() => {
    dispatch(fetchMarketPlace());
  }, [dispatch]);

  const handleNavigation = (value) => {
    if (value === 'artists') {
      setCurrent(0);
      history.push(`/${value}`);
    } else if (value === 'artworks') {
      setCurrent(1);
      history.push(`/${value}`);
    } else if (value === 'regions') {
      setCurrent(2);
      history.push(`/${value}`);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5, marginBottom: 5 }}>
      {isHeader && marketPlace && marketPlace.contract && (
        <>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Grid container direction="row">
                <Grid item xs={12} md={3}>
                  <Link
                    to="/"
                    style={{ color: current === 0 ? '#99CCCC' : 'black' }}
                  >
                    <img
                      src="/static/logo.svg"
                      alt="logo"
                      style={{ width: '80%' }}
                    />
                    <Typography variant="subtitle1" color="primary">
                      Change you lense, change your story
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={8} md={7}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon color="primary" />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Grid>
                <Grid item xs container direction="row" spacing={1}>
                  <Grid item>
                    <IconButton
                      size="medium"
                      sx={{
                        border: '1px solid #A2A28F',
                        borderRadius: '10%',
                        padding: '1px',
                      }}
                    >
                      <NotificationsNoneIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="medium"
                      sx={{
                        border: '1px solid #A2A28F',
                        borderRadius: '10%',
                        padding: '1px',
                      }}
                    >
                      <MailOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={handleClick}
                      size="medium"
                      sx={{
                        border: '1px solid #A2A28F',
                        borderRadius: '10%',
                        padding: '1px',
                      }}
                    >
                      <PersonOutlineIcon fontSize="inherit" />
                    </IconButton>
                    {/* Menu to login and Register, ... */}
                    <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            spacing={1}
            sx={{ paddingLeft: 3 }}
          >
            <Grid item xs={12} container direction="row">
              <Grid item>
                <Link to="#" onClick={() => handleNavigation('artists')}>
                  <Typography
                    variant="body2"
                    sx={{
                      padding: 1,
                      color: current === 0 ? '#99CCCC' : 'black',
                    }}
                  >
                    Photographers
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="#" onClick={() => handleNavigation('artworks')}>
                  <Typography
                    variant="body2"
                    sx={{
                      padding: 1,
                      color: current === 1 ? '#99CCCC' : 'black',
                    }}
                  >
                    Artworks
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="#" onClick={() => handleNavigation('regions')}>
                  <Typography
                    variant="body2"
                    sx={{
                      padding: 1,
                      color: current === 2 ? '#99CCCC' : 'black',
                    }}
                  >
                    Regions
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Header;
