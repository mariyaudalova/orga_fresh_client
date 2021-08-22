import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

export default createStore(
  combineReducers(rootReducer),
  compose(applyMiddleware(thunk), devTools)
  //applyMiddleware(thunk)
);
