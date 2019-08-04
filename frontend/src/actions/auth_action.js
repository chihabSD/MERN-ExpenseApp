import { AUTH_ATTEMP_LOGIN, AUTH_SUCCESS, AUTH_FAILED } from "./types";
import { apiLogin } from "../api/user";

const TOKEN_NAME = "expense_app_toke";
export const signIn = request_data => {
  return async dispatch => {
    dispatch({ type: AUTH_ATTEMP_LOGIN });
    try {
      const {
        data: { token } // distructuring from distructuring
      } = await apiLogin(request_data); //coming from ../api/user

      dispatch(success({ token }));
      //   console.log("data.token");
    } catch (e) {
      //   console.error(e.response.data);
      //dispatch error
      const {
        response: { data }
      } = e;
      dispatch(error(data.error));
    }
  };
};
/**
 * Once we submit the form, if there is a success,
 * then we get the token
 * so the next step is to store that token somewhere
 */
const success = token => {
  console.log(token);
  // localStorage.setItem('expense_app_toke', token)
  localStorage.setItem(TOKEN_NAME, token);
  return { type: AUTH_SUCCESS }; //return the action type success
};

/**
 * in case of error from serer:
 * return the action type Auth_failed
 * and the payload is the data ie the errors
 */
const error = errorsFromServer => {
  console.log(errorsFromServer);
  return {
    type: AUTH_FAILED,
    payload: errorsFromServer
  };
};
