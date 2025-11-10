// src/store.jsx
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { appReducer, postReducer, userReducer } from "./reducers";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  post: postReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
