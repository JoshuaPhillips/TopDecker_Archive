import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN, SIGN_UP_USER } from './graphql';
import { GET_AUTH_DATA } from '../../graphql';

import { StyledAuth } from './styles';
import { SectionHeader } from '../../shared/Headers';
import { Button } from '../../shared/Buttons';
import { Form, TextInputWithLabel } from '../../shared/Forms';

const Auth = () => {
  const client = useApolloClient();
  const [isLogin, toggleLogin] = useState(true);
  const [authDetails, setAuthDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    avatarUrl: ''
  });

  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });

  const LoginQuery = async () => {
    const { data } = await client.query({
      query: LOGIN,
      variables: {
        email: authDetails.email,
        password: authDetails.password
      },
      fetchPolicy: 'no-cache'
    });

    const { token, currentUserId } = data.login;
    localStorage.setItem('token', token);
    localStorage.setItem('currentUserId', currentUserId);
    client.writeQuery({
      query: GET_AUTH_DATA,
      data: {
        AuthData: {
          __typename: 'AuthData',
          token: token,
          currentUserId: currentUserId
        }
      }
    });
  };

  const [SignUpMutation] = useMutation(SIGN_UP_USER, {
    variables: { userDetails: authDetails },
    // we don't want the user's password stored in the cache, so we don't record the query or the response.
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      // instead, we save the response in localStorage and the 'AuthData' query. The latter can then be used to check authentication.
      localStorage.setItem('token', data.createUser.token);
      localStorage.setItem('currentUserId', data.createUser.currentUserId);
      client.writeQuery({
        query: GET_AUTH_DATA,
        data: {
          AuthData: {
            __typename: 'AuthData',
            token: data.createUser.token,
            currentUserId: data.createUser.currentUserId
          }
        }
      });
    }
  });

  const { token, currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  return token && currentUserId ? (
    <Redirect to='/decks' />
  ) : (
    <StyledAuth>
      <SectionHeader>{isLogin ? 'Login' : 'Sign Up'}</SectionHeader>

      <Form>
        {!isLogin && (
          <React.Fragment>
            <TextInputWithLabel>
              <label htmlFor='firstName'>First Name:</label>

              <input
                type='text'
                id='firstName'
                value={authDetails.firstName}
                onChange={e => setAuthDetails({ ...authDetails, firstName: e.target.value })}
              />
            </TextInputWithLabel>

            <TextInputWithLabel>
              <label htmlFor='lastName'>Last Name:</label>

              <input
                type='text'
                id='lastName'
                value={authDetails.lastName}
                onChange={e => setAuthDetails({ ...authDetails, lastName: e.target.value })}
              />
            </TextInputWithLabel>

            <TextInputWithLabel>
              <label htmlFor='username'>Username:</label>

              <input
                type='text'
                id='username'
                value={authDetails.username}
                onChange={e => setAuthDetails({ ...authDetails, username: e.target.value })}
              />
            </TextInputWithLabel>
          </React.Fragment>
        )}

        <TextInputWithLabel>
          <label htmlFor='email'>Email:</label>

          <input
            type='email'
            id='email'
            value={authDetails.email}
            onChange={e => setAuthDetails({ ...authDetails, email: e.target.value })}
          />
        </TextInputWithLabel>

        <TextInputWithLabel>
          <label htmlFor='password'>Password:</label>

          <input
            type='password'
            id='password'
            value={authDetails.password}
            onChange={e => setAuthDetails({ ...authDetails, password: e.target.value })}
          />
        </TextInputWithLabel>

        {!isLogin && (
          <React.Fragment>
            <TextInputWithLabel>
              <label htmlFor='avatarUrl'>Avatar Url:</label>

              <input
                type='url'
                id='avatarUrl'
                value={authDetails.avatarUrl}
                onChange={e => setAuthDetails({ ...authDetails, avatarUrl: e.target.value })}
              />
            </TextInputWithLabel>
          </React.Fragment>
        )}

        <Button type='button' onClick={isLogin ? () => LoginQuery() : () => SignUpMutation()}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </Form>

      <p
        className='loginModeToggleText'
        type='button'
        onClick={() => {
          toggleLogin(!isLogin);
        }}>
        {isLogin ? 'New to TopDecker? Sign Up here.' : 'Already have an account? Login here.'}
      </p>
    </StyledAuth>
  );
};

export default Auth;
