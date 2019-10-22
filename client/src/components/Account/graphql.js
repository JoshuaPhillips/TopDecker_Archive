import gql from 'graphql-tag';

export const GET_ACCOUNT_DETAILS = gql`
  query GetAccountDetails {
    getCurrentUser {
      firstName
      lastName
      username
      email
      avatarUrl
    }
  }
`;

export const SAVE_ACCOUNT_DETAILS = gql`
  mutation SaveAccountDetails($newDetails: UserDetailsInput!) {
    editUser(newDetails: $newDetails) {
      firstName
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!, $confirmationPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      confirmationPassword: $confirmationPassword
    ) {
      firstName
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($password: String!) {
    deleteUser(password: $password)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;
