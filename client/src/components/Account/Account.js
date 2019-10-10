import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACCOUNT_DETAILS, SAVE_ACCOUNT_DETAILS, CHANGE_PASSWORD } from './graphql';

import Spinner from '../Spinner/Spinner';

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
  const [deletingAccount, toggleDeletingAccount] = useState(false);
  const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState('');
  const [deleteConfirmationCheckbox, setDeleteConfirmationCheckbox] = useState(false);

  const GetAccountDetailsQueryResponse = useQuery(GET_ACCOUNT_DETAILS, {
    onCompleted() {
      const { firstName, lastName, username, email, avatarUrl } = GetAccountDetailsQueryResponse.data.getCurrentUser;
      setAccountDetails({
        firstName,
        lastName,
        username,
        email,
        avatarUrl
      });
    }
  });

  const [SaveAccountDetailsMutation] = useMutation(SAVE_ACCOUNT_DETAILS, {
    variables: {
      newDetails: {
        ...accountDetails
      }
    },
    onCompleted() {
      toast.success('Account details saved.');
      toggleEditing(false);
    }
  });

  const [ChangePasswordMutation] = useMutation(CHANGE_PASSWORD, {
    fetchPolicy: 'no-cache',
    variables: {
      ...passwordDetails
    },
    onCompleted() {
      toast.success('Password saved.');
      setPasswordDetails({ currentPassword: '', newPassword: '', confirmationPassword: '' });
    }
  });

  const resetPasswordChange = () => {
    toggleEditingPassword(false);
    setPasswordDetails({ currentPassword: '', newPassword: '', confirmationPassword: '' });
  };

  const resetAccountDeletion = () => {
    toggleDeletingAccount(false);
    setDeleteConfirmationPassword('');
    setDeleteConfirmationCheckbox(false);
  };

  if (GetAccountDetailsQueryResponse.loading) {
    return <Spinner />;
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

        <label htmlFor='username'>Username:</label>
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

        <button type='button' onClick={editing ? () => SaveAccountDetailsMutation() : () => toggleEditing(true)}>
          {editing ? 'Save' : 'Edit'}
        </button>
      </form>

      <form>
        <h1>Danger Zone</h1>
        {!editingPassword && (
          <button type='button' onClick={() => toggleEditingPassword(true)}>
            Change Password
          </button>
        )}

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
            <button type='button' onClick={() => resetPasswordChange()}>
              Cancel
            </button>
          </React.Fragment>
        )}

        <button type='button' onClick={() => toggleDeletingAccount(true)}>
          Delete Account
        </button>
        {deletingAccount && (
          <React.Fragment>
            <label htmlFor='accountDeleteConfirmationPassword'>Enter Your Password:</label>
            <input
              type='text'
              id='accountDeleteConfirmationPassword'
              disabled={!deletingAccount}
              onChange={e => setDeleteConfirmationPassword(e.target.value)}
            />

            <label htmlFor='accountDeleteConfirmationCheckbox'>Do you really want to delete your account?</label>
            <input
              type='checkbox'
              id='accountDeleteConfirmationCheckbox'
              disabled={!deletingAccount}
              onChange={e => setDeleteConfirmationCheckbox(e.target.value)}
            />
            <button
              type='button'
              disabled={!deletingAccount || deleteConfirmationPassword.length === 0 || !deleteConfirmationCheckbox}
              onClick={() => console.log(deleteConfirmationPassword, deleteConfirmationCheckbox)}>
              Delete Forever
            </button>
            <button type='button' onClick={() => resetAccountDeletion()}>
              Cancel
            </button>
          </React.Fragment>
        )}
      </form>
    </main>
  );
};

export default Account;
