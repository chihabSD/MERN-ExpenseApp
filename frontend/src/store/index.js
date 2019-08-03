import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

//create the middleware
const middlewares = [thunk];
const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/**
 * create store takes reducer as first argument
 * and takes the initial state as a second argument
 * and takes store enhancer:
 * the store enhancer is at the preloaded state which means
 * if we just included in the createStore the systme might crash
 */
export default createStore(
  reducers,
  {},
  storeEnhancer(applyMiddleware(...middlewares))
);
