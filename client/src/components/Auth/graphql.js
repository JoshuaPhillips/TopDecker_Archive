import gql from 'graphql-tag';

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      currentUserId
    }
  }
`;
