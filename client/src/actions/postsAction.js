import { POSTS_LOADED, POST_CREATED, COMMENT_SUCCESS } from "./types";
import axios from "axios";

// Loads all posts
export const loadPosts = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  // If token, then add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios.get("/api/posts/", config).then((res) =>
    dispatch({
      type: POSTS_LOADED,
      payload: res.data,
    })
  );
};

// Create a new post
export const createPost = (obj) => (dispatch, getState) => {
  console.log(obj);
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(config, obj);

  axios.post("/api/posts/", obj, config).then((res) => {
    console.log(res);
    dispatch(loadPosts());
    dispatch({
      type: POST_CREATED,
    });
  });
};

// Post a comment
export const postComment = (obj) => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {},
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios.post("/api/posts/comments/", obj, config).then((res) => {
    dispatch(loadPosts());
    dispatch({
      type: COMMENT_SUCCESS,
    });
  });
};
