import {
  FILTER_BY_REGION_FAIL,
  FILTER_BY_REGION_REQUEST,
  FILTER_BY_REGION_RESET,
  FILTER_BY_REGION_SUCCESS,
} from '../constants/filterConstants';

export const filterReducer = (state = { origins: [] }, action) => {
  switch (action.type) {
    case FILTER_BY_REGION_REQUEST:
      return { loading: true };
    case FILTER_BY_REGION_SUCCESS:
      return { loading: false, success: true, origins: action.payload };
    case FILTER_BY_REGION_FAIL:
      return { loading: false, error: action.payload };
    case FILTER_BY_REGION_RESET:
      return {};
    default:
      return state;
  }
};
