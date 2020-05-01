import { POSTS_LOADED, POST_CREATED, COMMENT_SUCCESS } from "../actions/types";

const initialState = {
  posts: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADED:
      return {
        ...state,
        posts: action.payload,
      };
    case POST_CREATED:
      return {
        ...state,
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
