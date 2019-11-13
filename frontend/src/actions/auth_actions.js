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
  
// import {
//   AUTH_ATTEMPTING,
//   AUTH_FAILED,
//   AUTH_SUCCESS,
//   USER_LOGOUT,
//   PROFILE_FETCHED
// } from "../actions/types";
// import { apiLogin, fetchProfile } from "../api/user";
// import setAuthHeader from "../api/set_AuthHeader";

// const TOKEN_NAME = "expenseApp";
// export const signIn = request_data => {
//   return async dispatch => {
//     dispatch({ type: AUTH_ATTEMPTING });
//     try {
//       // extract data from axios and store in { data }
//       const {
//         data: { token }
//       } = await apiLogin(request_data);
//       // when user sigin we fetch the profile
//       setAuthHeader(token);
//       dispatch(getUserProfile());
//       dispatch(success(token));
//       console.log(token); // log the data
//     } catch (e) {
//       const {
//         response: { data }
//       } = e;
//       console.log(data);
//       dispatch(error(data.error));
//       //console.error(data.error) // log any error
//     }
//   };
// };
// // check when the applicaiton is load in index.js
// export const checkIfSignedIn = () => {
//   return dispatch => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       if (!token) {
//         return dispatch(error("You need to login"));
//       }
//       // call the funciton success and pass in the token
//       setAuthHeader(token);
//       dispatch(success(token));
//     } catch (e) {
//       console.error(e);
//     }
//   };
// };
// export const getUserProfile = () => {
//   return async dispatch => {
//     try {
//       const {
//         data: { user }
//       } = await fetchProfile();
//       console.log(user);
//       dispatch ( { type: PROFILE_FETCHED, payload:user})
//     } catch (e) {
//       console.error(e);
//     }
//   };
// };
// export const logOut = () => {
//   localStorage.removeItem(TOKEN_NAME);
//   setAuthHeader(null)
//   return { type: USER_LOGOUT };
// };
// // In case there is a succcess
// const success = token => {
//   localStorage.setItem(TOKEN_NAME, token);
//   return { type: AUTH_SUCCESS };
// };

// // errors
// const error = error => {
//   return { type: AUTH_FAILED, payload: error };
// };
