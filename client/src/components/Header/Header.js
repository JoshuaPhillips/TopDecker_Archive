import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTH_DATA, LOGOUT } from '../../graphql';

import classes from './Header.module.scss';

const Header = props => {
  const GetAuthDataQueryResponse = useQuery(GET_AUTH_DATA, { fetchPolicy: 'cache-only' });
  const [GetAuthDataQueryLazily, GetAuthDataQueryResponseLazily] = useLazyQuery(GET_AUTH_DATA, {
    fetchPolicy: 'cache-only',
    onCompleted() {
      console.log(GetAuthDataQueryResponseLazily.data.AuthData);
    }
  });
  const [LogoutMutation] = useMutation(LOGOUT);

  const { currentUserId } = GetAuthDataQueryResponse.data.AuthData;

  return (
    <header className={classes.Header}>
      <h1>Welcome to TopDeckr</h1>
      <nav>
        <ul>
          {currentUserId && (
            <React.Fragment>
              <Link to='/account'>Account</Link>
              <Link to='/decks'>Decks</Link>
              <Link to='/sandbox'>Sandbox</Link>

              <button type='button' onClick={() => LogoutMutation()}>
                Logout
              </button>
            </React.Fragment>
          )}

          <button type='button' onClick={() => GetAuthDataQueryLazily()}>
            Get Auth Data
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
