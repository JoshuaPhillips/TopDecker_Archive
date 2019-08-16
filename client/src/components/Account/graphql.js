import gql from 'graphql-tag';

export const GET_ACCOUNT_DETAILS = gql`
  query GetAccountDetails {
    getUserById {
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
