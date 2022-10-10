import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>,
  </ThemeProvider>,

  document.getElementById('root'),
);
