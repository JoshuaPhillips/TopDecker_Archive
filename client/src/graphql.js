import gql from 'graphql-tag';

export const GET_AUTH_DATA = gql`
  query GetAuthData {
    AuthData @client {
      token
      currentUserId
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;
