import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { LOGIN } from './graphql';
import { GET_AUTH_DATA } from '../../graphql';

import classes from './Auth.module.scss';

const Auth = props => {
  const [isLogin, toggleLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    avatarUrl: ''
  });

  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });

  const [LoginQuery, LoginQueryResponse] = useLazyQuery(LOGIN, {
    variables: { email: loginDetails.email, password: loginDetails.password },
    // we don't want the user's password stored in the cache, so we don't record the query or the response.
    fetchPolicy: 'no-cache',
    onCompleted() {
      // instead, we save the response in localStorage and the 'AuthData' query. The latter can then be used to check authentication.
      const { client, data } = LoginQueryResponse;
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('currentUserId', data.login.currentUserId);
      client.writeQuery({
        query: GET_AUTH_DATA,
        data: {
          AuthData: {
            __typename: 'AuthData',
            token: data.login.token,
            currentUserId: data.login.currentUserId
          }
        }
      });
    }
  });

  const { token, currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  return token && currentUserId ? (
    <Redirect to='/decks' />
  ) : (
    <main className={classes.Auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form>
        {!isLogin && (
          <React.Fragment>
            <label htmlFor='firstName'>First Name:</label>
            <input
              type='text'
              id='firstName'
              value={loginDetails.firstName}
              onChange={e => setLoginDetails({ ...loginDetails, firstName: e.target.value })}
            />

            <label htmlFor='lastName'>Last Name:</label>
            <input
              type='text'
              id='lastName'
              value={loginDetails.lastName}
              onChange={e => setLoginDetails({ ...loginDetails, lastName: e.target.value })}
            />

            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={loginDetails.username}
              onChange={e => setLoginDetails({ ...loginDetails, username: e.target.value })}
            />
          </React.Fragment>
        )}

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={loginDetails.email}
          onChange={e => setLoginDetails({ ...loginDetails, email: e.target.value })}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={loginDetails.password}
          onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })}
        />

        {!isLogin && (
          <React.Fragment>
            <label htmlFor='avatarUrl'>Avatar Url:</label>
            <input
              type='url'
              id='avatarUrl'
              value={loginDetails.avatarUrl}
              onChange={e => setLoginDetails({ ...loginDetails, avatarUrl: e.target.value })}
            />
          </React.Fragment>
        )}

        <button type='button' onClick={() => LoginQuery()}>
          Login
        </button>
      </form>

      <p
        onClick={() => {
          toggleLogin(!isLogin);
        }}>
        {isLogin ? 'New to TopDecker? Sign Up here.' : 'Already have an account? Login here.'}
      </p>
    </main>
  );
};

export default Auth;
