import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { authSlice, transactionSlice } from "./slices";

export * from "./slices";


const rootReducer = {
  auth: authSlice.reducer,
  transaction: transactionSlice.reducer
};

const createStore = () => {
  let middleware = [thunk];
  
  if(process.env.NODE_ENV === 'development'){
    middleware.push(
      logger
    );
  }
  
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: localStorage.getItem('redux-state')
    ? JSON.parse(localStorage.getItem('redux-state'))
    : {}
  });
  
  store.subscribe(() => {
    localStorage.setItem('redux-state', JSON.stringify(store.getState()))
  });
  
  return store;
}
export const store = createStore();