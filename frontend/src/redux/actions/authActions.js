import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "./actionTypes"
import { toast } from "react-toastify";
import api from "../api/api";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://mern-task-manager-73nz.onrender.com/api";

export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('token', data.token);
    toast.success(data.msg);
  }
  catch (error) {
    const msg = error.response?.data?.msg || error.message;
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg }
    });
    toast.error(msg);
  }
}

export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: token }
    });
    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data.user, token },
    });
  }
  catch (error) {
    // fail silently
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  document.location.href = '/';
}

const { data } = await api.post('/auth/login', { email, password });
