import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { GET_AUTH_DATA } from './graphql';

import Auth from './components/Auth';
import Account from './components/Account';
import DeckList from './components/DeckList';
import DeckManager from './components/DeckManager';
import Export from './components/Export';
import Header from './components/Header';
import Search from './components/Search/Search';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';
import Footer from './components/Footer';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

toast.configure({
  position: 'bottom-left',
  hideProgressBar: true,
  autoClose: 4000,
  delay: 0,
  style: {
    backgroundColor: 'transparent'
  }
});

const App = () => {
  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });

  const { token, currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  return (
    <StyledApp className='App'>
      <Header />
      <Switch>
        <Route path='/login' component={Auth} />
        {(!token || !currentUserId) && <Redirect to='/login' />}

        <Route path='/account' component={Account} />
        <Route path='/decks' exact component={DeckList} />
        <Route path='/decks/:deckId/export' component={Export} />
        <Route path='/decks/:deckId' component={DeckManager} />
        <Route path='/search/' component={Search} />

        <Redirect to='/decks' />
      </Switch>
      <Footer />
    </StyledApp>
  );
};

export default App;
