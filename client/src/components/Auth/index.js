import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN, SIGN_UP_USER } from './graphql';
import { GET_AUTH_DATA } from '../../graphql';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { StyledAuth, AuthForm, AuthFormButtonsWrapper } from './styles';
import { SectionHeader } from '../../shared/Headers';
import { Button } from '../../shared/Buttons';
import { FormRow, FormRowTitle, FormRowContent, TextInput } from '../../shared/Forms';

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

  const loginHandler = async e => {
    e.preventDefault();
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

  const signUpHandler = e => {
    e.preventDefault();
    SignUpMutation();
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

      <AuthForm onSubmit={isLogin ? e => loginHandler(e) : e => signUpHandler(e)}>
        {!isLogin && (
          <React.Fragment>
            <FormRow>
              <FormRowTitle>
                <label htmlFor='firstName'>First Name:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='text'
                  id='firstName'
                  value={authDetails.firstName}
                  onChange={e => setAuthDetails({ ...authDetails, firstName: e.target.value })}
                />
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>
                <label htmlFor='lastName'>Last Name:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='text'
                  id='lastName'
                  value={authDetails.lastName}
                  onChange={e => setAuthDetails({ ...authDetails, lastName: e.target.value })}
                />
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>
                <label htmlFor='username'>Username:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='text'
                  id='username'
                  value={authDetails.username}
                  onChange={e => setAuthDetails({ ...authDetails, username: e.target.value })}
                />
              </FormRowContent>
            </FormRow>
          </React.Fragment>
        )}

        <FormRow>
          <FormRowTitle>
            <label htmlFor='email'>Email:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='email'
              id='email'
              value={authDetails.email}
              onChange={e => setAuthDetails({ ...authDetails, email: e.target.value })}
            />
          </FormRowContent>
        </FormRow>

        <FormRow>
          <FormRowTitle>
            <label htmlFor='password'>Password:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='password'
              id='password'
              value={authDetails.password}
              onChange={e => setAuthDetails({ ...authDetails, password: e.target.value })}
            />
          </FormRowContent>
        </FormRow>

        {!isLogin && (
          <React.Fragment>
            <FormRow>
              <FormRowTitle>
                <label htmlFor='avatarUrl'>Avatar Url:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='url'
                  id='avatarUrl'
                  value={authDetails.avatarUrl}
                  onChange={e => setAuthDetails({ ...authDetails, avatarUrl: e.target.value })}
                />
              </FormRowContent>
            </FormRow>
          </React.Fragment>
        )}
        <AuthFormButtonsWrapper>
          <Button type='submit'>
            <FontAwesomeIcon icon={faSignInAlt} fixedWidth />
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </AuthFormButtonsWrapper>
      </AuthForm>

      <p
        className='loginModeToggleText'
        onClick={() => {
          toggleLogin(!isLogin);
        }}>
        {isLogin ? 'New to TopDecker? Sign Up here.' : 'Already have an account? Login here.'}
      </p>
    </StyledAuth>
  );
};

export default Auth;
