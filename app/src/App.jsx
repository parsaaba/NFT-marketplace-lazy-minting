import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
  useLocation,
  useHistory,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Main from './pages/Main';
import Header from './components/nav/Header';
import Footer from './components/nav/Footer';
import ArtworksList from './pages/ArtworkList';
import Artwork from './pages/Artwork';
import UserProfile from './pages/UserProfile';
import ArtistList from './pages/ArtistList';
import Artist from './pages/Artist';
import Cart from './pages/Cart';

const App = () => (
  <>
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/artworks/:workId" component={Artwork} />
          <Route path="/artworks/" component={ArtworksList} />
          <Route path="/artists/:artistId" component={Artist} />
          <Route path="/artists/" component={ArtistList} />
          <Route exact path="/users/profile" component={UserProfile} />
          <Route path="/cart/shippingAddress/:workId?" component={Cart} />
          {/* <Route path="/cart/placeOrder/:workId?" component={Cart} />
            <Route path="/orders/:orderId" component={Cart} />
            <Route exact path="/login" component={EnterForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route path="/admin-panel/user/:userId/edit" component={UserEdit} />
            <Route exact path="/admin-panel/:route" component={AdminPanel} /> */}
        </Switch>
      </React.StrictMode>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
