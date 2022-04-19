import {
  DEPLOY_MARKET_PLACE_SUCCESS,
  DEPLOY_MARKET_PLACE_REQUEST,
  DEPLOY_MARKET_PLACE_FAIL,
  MARKET_PLACE_REQUEST,
  MARKET_PLACE_SUCCESS,
  MARKET_PLACE_FAIL,
  WALLET_CONNECT_REQUEST,
  WALLET_CONNECT_SUCCESS,
  WALLET_CONNECT_FAIL,
  MARKET_BALANCE_REQUEST,
  MARKET_BALANCE_SUCCESS,
  MARKET_BALANCE_FAIL,
  //   NO_WALLET_CONNECT_FAIL,
  //   NO_WALLET_CONNECT_SUCCESS,
  //   NO_WALLET_CONNECT_REQUEST,
  //   NFT_MINT_REQUEST,
  //   NFT_MINT_SUCCESS,
  //   NFT_MINT_FAIL,
  //   NFT_MINT_RESET,
  //   NFT_LIST_SUCCESS,
  //   NFT_LIST_FAIL,
  //   NFT_LIST_REQUEST,
  //   NFT_PURCHASE_FAIL,
  //   NFT_PURCHASE_SUCCESS,
  //   NFT_PURCHASE_REQUEST,
  MARKET_ADD_REQUEST,
  MARKET_ADD_SUCCESS,
  MARKET_ADD_FAIL,
  MARKET_ADD_RESET,
  // NFT_LIST_REQUEST,
  // NFT_LIST_SUCCESS,
  // NFT_LIST_FAIL,
  MARKET_ETH_PRICE_REQUEST,
  MARKET_ETH_PRICE_SUCCESS,
  MARKET_ETH_PRICE_FAIL,
  MARKET_ETH_PRICE_RESET,
  MARKET_FEE_SHIPPING_REQUEST,
  MARKET_FEE_SHIPPING_SUCCESS,
  MARKET_FEE_SHIPPING_FAIL,
  MARKET_WITHDRAW_REQUEST,
  MARKET_WITHDRAW_SUCCESS,
  MARKET_WITHDRAW_FAIL,
  //   MY_PURCHASED_NFT_FAIL,
  //   MY_PURCHASED_NFT_REQUEST,
  //   MY_PURCHASED_NFT_SUCCESS,
} from '../constants/marketPlaceConstants';

export const marketPlaceDeployReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPLOY_MARKET_PLACE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case DEPLOY_MARKET_PLACE_SUCCESS:
      return {
        loading: false,
        success: true,
        BLOCKCHAIN: action.payload,
      };
    case DEPLOY_MARKET_PLACE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const marketPlaceFeeReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_FEE_SHIPPING_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case MARKET_FEE_SHIPPING_SUCCESS:
      return {
        loading: false,
        success: true,
        vadeeFees: action.payload,
      };
    case MARKET_FEE_SHIPPING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const marketPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_PLACE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case MARKET_PLACE_SUCCESS:
      return {
        loading: false,
        success: true,
        marketPlace: action.payload,
      };
    case MARKET_PLACE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const walletConnectionReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_CONNECT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case WALLET_CONNECT_SUCCESS:
      return {
        loading: false,
        success: true,
        wallet: action.payload,
      };
    case WALLET_CONNECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const marketBalanceReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case MARKET_BALANCE_SUCCESS:
      return {
        loading: false,
        success: true,
        marketBalance: action.payload,
      };
    case MARKET_BALANCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const marketWithdrawReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_WITHDRAW_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case MARKET_WITHDRAW_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      };
    case MARKET_WITHDRAW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const marketPlaceAddReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_ADD_REQUEST:
      return { loading: true };
    case MARKET_ADD_SUCCESS:
      return { loading: false, success: true, theItem: action.payload };
    case MARKET_ADD_FAIL:
      return { loading: false, error: action.payload };
    case MARKET_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const ethPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_ETH_PRICE_REQUEST:
      return { loading: true };
    case MARKET_ETH_PRICE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case MARKET_ETH_PRICE_FAIL:
      return { loading: false, error: action.payload };
    case MARKET_ETH_PRICE_RESET:
      return {};
    default:
      return state;
  }
};
// export const noWalletReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NO_WALLET_CONNECT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//       };
//     case NO_WALLET_CONNECT_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         BLOCKCHAIN: action.payload,
//       };
//     case NO_WALLET_CONNECT_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const NftMintReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NFT_MINT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//       };
//     case NFT_MINT_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         tokenNFT: action.payload,
//       };
//     case NFT_MINT_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     case NFT_MINT_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const NftPurchaseReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NFT_PURCHASE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//       };
//     case NFT_PURCHASE_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         purchased: action.payload,
//       };
//     case NFT_PURCHASE_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const myPurchasedNFTReducer = (state = {}, action) => {
//   switch (action.type) {
//     case MY_PURCHASED_NFT_REQUEST:
//       return { loading: true };
//     case MY_PURCHASED_NFT_SUCCESS:
//       return { loading: false, success: true, myItems: action.payload };
//     case MY_PURCHASED_NFT_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
