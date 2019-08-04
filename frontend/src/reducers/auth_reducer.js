import { AUTH_ATTEMP_LOGIN, AUTH_SUCCESS, AUTH_FAILED } from "../actions/types";
/**
 * The initial state when the user attampe to loggin
 */
const INITIAL_STATE = {
  attempLogin: false,
  isLogged: false,
  profile: {},
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /** in case of user wanto login
     *
     */
    case AUTH_ATTEMP_LOGIN:
      return { ...state, attempLogin: true, isLogged: false, error: null };

    case AUTH_SUCCESS:
      return { ...state, attempLogin: false, isLogged: true, error: null };
    case AUTH_FAILED:
      return {
        ...state,
        attempLogin: false,
        isLogged: false,
        error: action.payload
      };
    default:
      return state;
  }
};
