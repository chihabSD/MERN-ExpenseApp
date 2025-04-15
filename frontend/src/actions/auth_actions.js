import {
    AUTH_SUCCESS,
    AUTH_FAILED,
    USER_LOGGED_OUT,
    PROFILE_FEATCHED,
    REGISTER_FAILURE,REGISTER_SUCCESS,REGISTER_REQUEST
  } from './types';
  import { apiLogin, apitFetchProfile, registerUser} from '../api/user';
  import setAuthHeader from '../api/setAuthHeader';
  
  const TOKEN_NAME = 'expense_app_token';
  export const signIn = request_data => {
    return async dispatch => {
      try {
        const {
          data: { token }
        } = await apiLogin(request_data);
        setAuthHeader(token);
        dispatch(getUserProfile());
        dispatch(success(token));
        console.log({data:{token}})
      } catch (e) {
        const {
          response: { data }
        } = e;
        dispatch(error(data.error));
      }
    };
  };
  
  export const onLodingSignIn = () => {
    return dispatch => {
      try {
        const token = localStorage.getItem(TOKEN_NAME);
        if (token === null || token === 'undefined') {
          return dispatch(error('You need to login '));
        }
        setAuthHeader(token);
        dispatch(getUserProfile());
        dispatch(success(token));
      } catch (e) {
        console.error(e);
      }
    };
  };
  
  export const getUserProfile = () => {
    return async dispatch => {
      try {
        const {
          data: { user }
        } = await apitFetchProfile();
        
        dispatch({ type: PROFILE_FEATCHED, payload: user })
        console.log({user})

      } catch (e) {
        console.error(e.response);
      }
    };
  };
  
  export const logUserOut = () => {
    localStorage.clear();
    setAuthHeader(null);
    return { type: USER_LOGGED_OUT };
  };
  
  const success = token => {
    localStorage.setItem(TOKEN_NAME, token);
    return { type: AUTH_SUCCESS };
  };
  const error = error => {
    return { type: AUTH_FAILED, payload: error };
  };
  
