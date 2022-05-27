import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import { theme } from "./theme";

import { BrowserRouter } from 'react-router-dom';

import { store } from "./store";

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme.light}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
