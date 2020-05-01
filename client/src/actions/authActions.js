import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT_SUCCESS,
} from "./types";
import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  // If token, then add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios.get("/api/users/", config).then((res) => {
    console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  });
};

export const register = (toSendObj) => (dispatch) => {
  axios
    .post("/api/users/register/", toSendObj)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
      })
    );
};

export const login = (toSendObj) => (dispatch) => {
  axios
    .post("/api/auth/", toSendObj)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
      })
    );
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
