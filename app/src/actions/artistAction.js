import artworksBase from '../apis/artworksBase';
import {
  ARTIST_BY_ID_FAIL,
  ARTIST_BY_ID_REQUEST,
  ARTIST_BY_ID_SUCCESS,
  ARTIST_LIST_FAIL,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS,
  ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST,
  ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS,
  ARTIST_GALLERY_ADDRESS_UPDATE_FAIL,
} from '../constants/artistConstants';

export const fetchArtistById = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: ARTIST_BY_ID_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await artworksBase.get(`artists/${id}/`, config);
    dispatch({
      type: ARTIST_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: ARTIST_BY_ID_FAIL,
      payload:
        e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
    });
  }
};

export const fetchArtistList =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ARTIST_LIST_REQUEST });

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await artworksBase.get(`artists/${keyword}`, config);
      dispatch({
        type: ARTIST_LIST_SUCCESS,
        payload: data,
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: ARTIST_LIST_FAIL,
        payload:
          e.response && e.response.data.details
            ? e.response.data.details
            : e.message,
      });
    }
  };

export const updateArtistGallery =
  (galleryAddress, artistId, artistWalletAddress) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ARTIST_GALLERY_ADDRESS_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const formData = new FormData();
      formData.set('galleryAddress', galleryAddress);
      formData.set('artistWalletAddress', artistWalletAddress);

      const { data } = await artworksBase.put(
        `/artists/${artistId}/gallery/update/`,
        formData,
        config
      );

      dispatch({
        type: ARTIST_GALLERY_ADDRESS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: ARTIST_GALLERY_ADDRESS_UPDATE_FAIL,
        payload:
          e.response && e.response.data.details
            ? e.response.data.details
            : e.message,
      });
    }
  };
