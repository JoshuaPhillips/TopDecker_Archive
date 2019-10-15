import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { GET_AUTH_DATA } from './graphql';

import Header from './components/Header';
import Auth from './components/Auth/Auth';
import Account from './components/Account';
import Search from './components/Search/Search';
import DeckList from './components/DeckList';
import DeckManager from './components/DeckManager/DeckManager';
import Sandbox from './components/Sandbox/Sandbox';
import ComponentLibrary from './components/ComponentLibrary/ComponentLibrary';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

toast.configure({
  position: 'bottom-left',
  hideProgressBar: true,
  autoClose: 4000,
  delay: 0
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
        <Route path='/decks/:deckId' component={DeckManager} />
        <Route path='/search/' component={Search} />
        <Route path='/sandbox' component={Sandbox} />
        <Route path='/library' component={ComponentLibrary} />
        <Redirect to='/decks' />
      </Switch>
    </StyledApp>
  );
};

export default App;
