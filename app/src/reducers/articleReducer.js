import {
  ARTICLE_FAIL,
  ARTICLE_REQUEST,
  ARTICLE_SUCCESS,
} from '../constants/articleConstants';

export const articleListReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case ARTICLE_REQUEST:
      return { loading: true };
    case ARTICLE_SUCCESS:
      return { loading: false, success: true, articles: action.payload };
    case ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
