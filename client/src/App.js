import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { GET_AUTH_DATA } from './graphql';

import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import Account from './components/Account/Account';
import DeckList from './components/DeckList/DeckList';
import DeckManager from './components/DeckManager/DeckManager';
import Sandbox from './components/Sandbox/Sandbox';

const App = () => {
  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });

  const { token, currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/login' component={Auth} />
        {(!token || !currentUserId) && <Redirect to='/login' />}

        <Route path='/account' component={Account} />
        <Route path='/decks' exact component={DeckList} />
        <Route path='/decks/:deckId' component={DeckManager} />
        <Route path='/sandbox' component={Sandbox} />
        <Redirect to='/decks' />
      </Switch>
    </div>
  );
};

export default App;
