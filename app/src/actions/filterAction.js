import artworksBase from '../apis/artworksBase';
import {
  FILTER_BY_REGION_FAIL,
  FILTER_BY_REGION_REQUEST,
  FILTER_BY_REGION_SUCCESS,
} from '../constants/filterConstants';

export const filterByRegion = () => async (dispatch) => {
  try {
    await dispatch({ type: FILTER_BY_REGION_REQUEST });
    const response = await artworksBase.get(`/artworks/origins`);
    dispatch({
      type: FILTER_BY_REGION_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: FILTER_BY_REGION_FAIL,
      payload:
        e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
    });
  }
};
