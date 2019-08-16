import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACCOUNT_DETAILS, SAVE_ACCOUNT_DETAILS, CHANGE_PASSWORD } from './graphql';

import classes from './Account.module.scss';

const Account = props => {
  const [editing, toggleEditing] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    avatarUrl: ''
  });
  const [editingPassword, toggleEditingPassword] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  });

  const GetAccountDetailsQueryResponse = useQuery(GET_ACCOUNT_DETAILS, {
    onCompleted() {
      if (GetAccountDetailsQueryResponse.loading) {
        return;
      } else {
        const { firstName, lastName, username, email, avatarUrl } = GetAccountDetailsQueryResponse.data.getUserById;
        setAccountDetails({
          firstName,
          lastName,
          username,
          email,
          avatarUrl
        });
      }
    }
  });

  const [SaveAccountDetailsMutation] = useMutation(SAVE_ACCOUNT_DETAILS, {
    variables: {
      newDetails: {
        ...accountDetails
      }
    },
    onCompleted() {
      toggleEditing(false);
    }
  });

  const [ChangePasswordMutation] = useMutation(CHANGE_PASSWORD, {
    fetchPolicy: 'no-cache',
    variables: {
      ...passwordDetails
    },
    onCompleted() {
      setPasswordDetails({ currentPassword: '', newPassword: '', confirmationPassword: '' });
    }
  });

  if (GetAccountDetailsQueryResponse.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={classes.Account}>
      <h1>Account</h1>

      <form>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          id='firstName'
          value={accountDetails.firstName}
          onChange={e => setAccountDetails({ ...accountDetails, firstName: e.target.value })}
          readOnly={!editing}
        />

        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          id='lastName'
          value={accountDetails.lastName}
          onChange={e => setAccountDetails({ ...accountDetails, lastName: e.target.value })}
          readOnly={!editing}
        />

        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          value={accountDetails.username}
          onChange={e => setAccountDetails({ ...accountDetails, username: e.target.value })}
          readOnly={!editing}
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={accountDetails.email}
          onChange={e => setAccountDetails({ ...accountDetails, email: e.target.value })}
          readOnly={!editing}
        />

        <label htmlFor='avatarUrl'>Avatar Url:</label>
        <input
          type='url'
          id='avatarUrl'
          value={accountDetails.avatarUrl}
          onChange={e => setAccountDetails({ ...accountDetails, avatarUrl: e.target.value })}
          readOnly={!editing}
        />

        {!editing && (
          <button type='button' onClick={() => toggleEditing(true)}>
            Edit
          </button>
        )}

        {editing && (
          <button type='button' onClick={() => SaveAccountDetailsMutation()}>
            Save
          </button>
        )}

        <button type='button'>Delete</button>
        <hr />
        <button type='button' onClick={() => toggleEditingPassword(!editingPassword)}>
          Change Password
        </button>

        {editingPassword && (
          <React.Fragment>
            <label htmlFor='currentPassword'>Current Password:</label>
            <input
              type='password'
              id='currentPassword'
              value={passwordDetails.currentPassword}
              onChange={e => setPasswordDetails({ ...passwordDetails, currentPassword: e.target.value })}
            />

            <label htmlFor='newPassword'>New Password:</label>
            <input
              type='password'
              id='newPassword'
              value={passwordDetails.newPassword}
              onChange={e => setPasswordDetails({ ...passwordDetails, newPassword: e.target.value })}
            />

            <label htmlFor='confirmationPassword'>Confirm New Password:</label>
            <input
              type='password'
              id='confirmationPassword'
              value={passwordDetails.confirmationPassword}
              onChange={e => setPasswordDetails({ ...passwordDetails, confirmationPassword: e.target.value })}
            />

            <button type='button' onClick={() => ChangePasswordMutation()}>
              Confirm
            </button>
          </React.Fragment>
        )}
      </form>
    </main>
  );
};

export default Account;
