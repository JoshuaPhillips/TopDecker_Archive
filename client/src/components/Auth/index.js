import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { LOGIN, SIGN_UP_USER } from './graphql';
import { GET_AUTH_DATA } from '../../graphql';

import { toast } from 'react-toastify';

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

    if (authDetails.email === '') return toast.error('Please enter your email address.');
    if (authDetails.password === '') return toast.error('Please enter your password.');

    const { data, errors } = await client.query({
      query: LOGIN,
      variables: {
        email: authDetails.email,
        password: authDetails.password
      },
      fetchPolicy: 'no-cache'
    });

    if (errors) {
      errors.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

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

  const signUpHandler = async e => {
    e.preventDefault();

    const { firstName, lastName, username, email, password } = authDetails;

    if (firstName === '') return toast.error('Please enter a first name.');
    if (lastName === '') return toast.error('Please enter a last name.');
    if (username === '') return toast.error('Please enter a username.');
    if (email === '') return toast.error('Please enter an email address.');
    if (password === '') return toast.error('Please enter a password.');

    const { data, errors } = await client.mutate({
      mutation: SIGN_UP_USER,
      variables: { userDetails: authDetails },
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    });

    if (errors) {
      errors.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    if (data) {
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
  };

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
