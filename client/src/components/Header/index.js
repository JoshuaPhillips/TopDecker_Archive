import React from 'react';
import { NavLink } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTH_DATA, LOGOUT } from '../../graphql';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faClone, faSearch, faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
              <FontAwesomeIcon icon={faUserCircle} fixedWidth />
              Account
            </NavigationLink>
            <NavigationLink as={NavLink} to='/decks'>
              <FontAwesomeIcon icon={faClone} fixedWidth />
              Decks
            </NavigationLink>
            <NavigationLink as={NavLink} to='/search'>
              <FontAwesomeIcon icon={faSearch} fixedWidth />
              Search
            </NavigationLink>
            <NavigationLink as={NavLink} to='/login' onClick={() => LogoutMutation()}>
              <FontAwesomeIcon icon={faPowerOff} fixedWidth />
              Logout
            </NavigationLink>
          </React.Fragment>
        </Nav>
      )}
    </StyledHeader>
  );
};

export default Header;
