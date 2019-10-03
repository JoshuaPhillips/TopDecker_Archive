import gql from 'graphql-tag';

export const GET_AUTH_DATA = gql`
  query GetAuthData {
    AuthData @client {
      currentUserId
    }
  }
`;
