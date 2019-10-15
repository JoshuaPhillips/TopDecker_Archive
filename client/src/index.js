import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//Apollo
import { ApolloProvider } from 'react-apollo';
import client from './Apollo.js';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { Theme } from './Theme';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
