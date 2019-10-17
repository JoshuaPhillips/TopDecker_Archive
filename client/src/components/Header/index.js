import React from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTH_DATA, LOGOUT } from '../../graphql';

import { StyledHeader, Nav, NavigationLink } from './styles.js';

const Header = () => {
  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });
  const [LogoutMutation] = useMutation(LOGOUT);

  const { currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  return (
    <StyledHeader>
      <h1>Welcome to TopDecker</h1>
      {currentUserId && (
        <Nav>
          <React.Fragment>
            <NavigationLink as={NavLink} to='/account'>
              Account
            </NavigationLink>
            <NavigationLink as={NavLink} to='/decks'>
              Decks
            </NavigationLink>
            <NavigationLink as={NavLink} to='/search'>
              Search
            </NavigationLink>
            <NavigationLink type='button' onClick={() => LogoutMutation()}>
              Logout
            </NavigationLink>
          </React.Fragment>
        </Nav>
      )}
    </StyledHeader>
  );
};

export default Header;
