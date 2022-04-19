import artworksBase from '../apis/artworksBase';
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_REMOVE_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart = (workId) => async (dispatch, getState) => {
  try {
    console.log(workId);
    dispatch({ type: CART_ADD_REQUEST });

    const { data } = await artworksBase.get(`/artworks/${workId}/`);

    dispatch({
      type: CART_ADD_SUCCESS,
      payload: {
        artworkId: data._id,
        quantityToBuy: 1,
        firstName: data.artist.firstName,
        lastName: data.artist.lastName,
        title: data.title,
        description: data.description,
        image: data.image,
        price: data.price,
        category: data.category.name,
        subCategory: data.sub_category.name,
      },
    });
    // save the item in browser local storage. It needs to be parsed back to an object to be used
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().theCart.cartItems)
    );
  } catch (e) {
    console.log(e);
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CART_ADD_FAIL,
      payload:
        e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
    });
  }
};

export const cleanLocalCart = () => async (dispatch) => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('cartItems');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('shippingAddress');
  dispatch({
    type: CART_REMOVE_ITEMS,
  });
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  // eslint-disable-next-line no-undef
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
