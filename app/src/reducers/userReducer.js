import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_FAVORITE_ARTWORK_REQUEST,
  USER_FAVORITE_ARTWORK_SUCCESS,
  USER_FAVORITE_ARTWORK_FAIL,
  USER_FAVORITE_ARTWORK_LIST_SUCCESS,
  USER_FAVORITE_ARTWORK_LIST_REQUEST,
  USER_FAVORITE_ARTWORK_LIST_FAIL,
  USER_ARTIST_WORKS_REQUEST,
  USER_ARTIST_WORKS_SUCCESS,
  USER_ARTIST_WORKS_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const usersReducer = (state = { users: [], loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const favArtworkReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FAVORITE_ARTWORK_REQUEST:
      return { loading: true };
    case USER_FAVORITE_ARTWORK_SUCCESS:
      return { loading: false, success: true, artworkId: action.payload };
    case USER_FAVORITE_ARTWORK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const favArtworkListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FAVORITE_ARTWORK_LIST_REQUEST:
      return { loading: true };
    case USER_FAVORITE_ARTWORK_LIST_SUCCESS:
      return { loading: false, success: true, favArtworks: action.payload };
    case USER_FAVORITE_ARTWORK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const artistArtworksReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ARTIST_WORKS_REQUEST:
      return { loading: true };
    case USER_ARTIST_WORKS_SUCCESS:
      return { loading: false, success: true, works: action.payload };
    case USER_ARTIST_WORKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
