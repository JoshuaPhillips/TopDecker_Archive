import gql from 'graphql-tag';

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      currentUserId
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation SignUpUser($userDetails: CreateUserInput!) {
    createUser(userDetails: $userDetails) {
      token
      currentUserId
    }
  }
`;
