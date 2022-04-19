import artworksBase from '../apis/artworksBase';
import {
  ARTICLE_FAIL,
  ARTICLE_REQUEST,
  ARTICLE_SUCCESS,
} from '../constants/articleConstants';

export const fetchArticlesList = () => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await artworksBase.get(`articles/theArticle/`, config);
    dispatch({
      type: ARTICLE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: ARTICLE_FAIL,
      payload:
        e.response && e.response.data.details
          ? e.response.data.details
          : e.message,
    });
  }
};
