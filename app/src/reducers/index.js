import { combineReducers } from '@reduxjs/toolkit';
import {
  artworksReducer,
  artworkDeleteReducer,
  artworkReducer,
  artworkUpdateReducer,
  artworkCreateReducer,
  categoriesReducer,
  artworkVoucherDeleteReducer,
} from './artworkReducer.js';
import cartReducer from './cartReducer.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
  favArtworkReducer,
  favArtworkListReducer,
  artistArtworksReducer,
} from './userReducer';
import headerReducer from './headerReducer';
import {
  artistByIdReducer,
  artistGalleryReducer,
  artistListReducer,
} from './artistReducer.js';
import { articleListReducer } from './articleReducer.js';
import { filterReducer } from './filterReducer.js';
import {
  mintAndRedeemReducer,
  galleryDeployReducer,
  voucherReducer,
  walletConnectionReducer,
} from './lazyFactoryReducer.js';
import {
  ethPriceReducer,
  marketBalanceReducer,
  marketPlaceDeployReducer,
  marketPlaceFeeReducer,
  marketPlaceReducer,
  marketWithdrawReducer,
} from './marketPlaceReducer.js';

export default combineReducers({
  headerStatus: headerReducer,
  artworks: artworksReducer,
  theArtwork: artworkReducer,
  artworkDeleteList: artworkDeleteReducer,
  voucherDelete: artworkVoucherDeleteReducer,
  theCart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  artistList: artistListReducer,
  theArtist: artistByIdReducer,
  artworkUpdate: artworkUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  favArtwork: favArtworkReducer,
  favArtworkList: favArtworkListReducer,
  userDeleteList: userDeleteReducer,
  artworkCreate: artworkCreateReducer,
  userUpdate: userUpdateReducer, // update user from admin
  myWorks: artistArtworksReducer,
  articlesList: articleListReducer,
  filterOrigin: filterReducer,
  categoryList: categoriesReducer,
  walletConnection: walletConnectionReducer,
  myVoucher: voucherReducer,
  marketPlaceDeployment: marketPlaceDeployReducer,
  shippingAndFee: marketPlaceFeeReducer,
  theMarketPlace: marketPlaceReducer,
  marketPlaceBalance: marketBalanceReducer,
  marketWithdraw: marketWithdrawReducer,
  deployGallery: galleryDeployReducer,
  backEndGallery: artistGalleryReducer,
  redeemAndMint: mintAndRedeemReducer,
  ethPrice: ethPriceReducer,
});
