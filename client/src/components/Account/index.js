import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ACCOUNT_DETAILS, SAVE_ACCOUNT_DETAILS, CHANGE_PASSWORD } from './graphql';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLock, faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import Checkbox from '../Checkbox';
import Spinner from '../Spinner/Spinner';

import {
  StyledAccount,
  AccountForm,
  AccountFormButtonsWrapper,
  DeleteConfirmationMessage,
  DangerZoneButtonsWrapper
} from './styles';
import { SectionHeader } from '../../shared/Headers';
import { Button, ButtonGroup, DangerButton } from '../../shared/Buttons';
import { FormRow, FormRowTitle, FormRowContent, TextInput } from '../../shared/Forms';

const Account = () => {
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
      toast.info('Account details saved.');
      toggleEditing(false);
    }
  });

  const [ChangePasswordMutation] = useMutation(CHANGE_PASSWORD, {
    fetchPolicy: 'no-cache',
    variables: {
      ...passwordDetails
    },
    onCompleted() {
      toast.info('Password saved.');
      setPasswordDetails({ currentPassword: '', newPassword: '', confirmationPassword: '' });
    }
  });

  const submitPasswordChange = e => {
    e.preventDefault();
    ChangePasswordMutation();
  };

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
    <StyledAccount>
      <SectionHeader>Account</SectionHeader>

      <AccountForm>
        <FormRow>
          <FormRowTitle>
            <label htmlFor='firstName'>First Name:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='text'
              id='firstName'
              value={accountDetails.firstName}
              onChange={e => setAccountDetails({ ...accountDetails, firstName: e.target.value })}
              readOnly={!editing}
            />
          </FormRowContent>
        </FormRow>

        <FormRow>
          <FormRowTitle>
            <label htmlFor='lastName'>Last Name:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='text'
              id='lastName'
              value={accountDetails.lastName}
              onChange={e => setAccountDetails({ ...accountDetails, lastName: e.target.value })}
              readOnly={!editing}
            />
          </FormRowContent>
        </FormRow>

        <FormRow>
          <FormRowTitle>
            <label htmlFor='username'>Username:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='text'
              id='username'
              value={accountDetails.username}
              onChange={e => setAccountDetails({ ...accountDetails, username: e.target.value })}
              readOnly={!editing}
            />
          </FormRowContent>
        </FormRow>

        <FormRow>
          <FormRowTitle>
            <label htmlFor='email'>Email:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='email'
              id='email'
              value={accountDetails.email}
              onChange={e => setAccountDetails({ ...accountDetails, email: e.target.value })}
              readOnly={!editing}
            />
          </FormRowContent>
        </FormRow>

        <FormRow>
          <FormRowTitle>
            <label htmlFor='avatarUrl'>Avatar Url:</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='url'
              id='avatarUrl'
              value={accountDetails.avatarUrl}
              onChange={e => setAccountDetails({ ...accountDetails, avatarUrl: e.target.value })}
              readOnly={!editing}
            />
          </FormRowContent>
        </FormRow>
        <AccountFormButtonsWrapper>
          <Button type='button' onClick={editing ? () => SaveAccountDetailsMutation() : () => toggleEditing(true)}>
            <FontAwesomeIcon icon={faEdit} fixedWidth />
            {editing ? 'Save' : 'Edit'}
          </Button>
        </AccountFormButtonsWrapper>
      </AccountForm>

      <SectionHeader danger>Danger Zone</SectionHeader>

      {!editingPassword && !deletingAccount && (
        <DangerZoneButtonsWrapper>
          <Button
            type='button'
            onClick={() => {
              toggleDeletingAccount(false);
              toggleEditingPassword(true);
            }}>
            <FontAwesomeIcon icon={faLock} fixedWidth />
            Change Password
          </Button>

          <DangerButton
            type='button'
            onClick={() => {
              toggleEditingPassword(false);
              toggleDeletingAccount(true);
            }}>
            <FontAwesomeIcon icon={faTrash} fixedWidth />
            Delete Account
          </DangerButton>
        </DangerZoneButtonsWrapper>
      )}

      {editingPassword && (
        <React.Fragment>
          <AccountForm onSubmit={e => submitPasswordChange(e)}>
            <FormRow>
              <FormRowTitle>
                <label htmlFor='currentPassword'>Current Password:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='password'
                  id='currentPassword'
                  value={passwordDetails.currentPassword}
                  onChange={e => setPasswordDetails({ ...passwordDetails, currentPassword: e.target.value })}
                />
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>
                <label htmlFor='newPassword'>New Password:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='password'
                  id='newPassword'
                  value={passwordDetails.newPassword}
                  onChange={e => setPasswordDetails({ ...passwordDetails, newPassword: e.target.value })}
                />
              </FormRowContent>
            </FormRow>

            <FormRow>
              <FormRowTitle>
                <label htmlFor='confirmationPassword'>Confirm New Password:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='password'
                  id='confirmationPassword'
                  value={passwordDetails.confirmationPassword}
                  onChange={e => setPasswordDetails({ ...passwordDetails, confirmationPassword: e.target.value })}
                />
              </FormRowContent>
            </FormRow>
            <AccountFormButtonsWrapper>
              <Button
                inverted
                type='submit'
                disabled={
                  passwordDetails.currentPassword.length === 0 ||
                  passwordDetails.newPassword.length === 0 ||
                  passwordDetails.confirmationPassword.length === 0
                }>
                <FontAwesomeIcon icon={faCheck} fixedWidth />
                Confirm
              </Button>
              <Button inverted type='button' onClick={() => resetPasswordChange()}>
                <FontAwesomeIcon icon={faTimes} fixedWidth />
                Cancel
              </Button>
            </AccountFormButtonsWrapper>
          </AccountForm>
        </React.Fragment>
      )}

      <ButtonGroup></ButtonGroup>
      {deletingAccount && (
        <React.Fragment>
          <AccountForm onSubmit={() => console.log(deleteConfirmationPassword, deleteConfirmationCheckbox)}>
            <FormRow>
              <FormRowTitle>
                <label htmlFor='accountDeleteConfirmationPassword'>Enter your Password:</label>
              </FormRowTitle>
              <FormRowContent>
                <TextInput
                  type='text'
                  id='accountDeleteConfirmationPassword'
                  disabled={!deletingAccount}
                  onChange={e => setDeleteConfirmationPassword(e.target.value)}
                />
              </FormRowContent>
            </FormRow>

            <FormRow>
              <DeleteConfirmationMessage>Do you really want to delete your account?</DeleteConfirmationMessage>
              <Checkbox
                selected={deleteConfirmationCheckbox}
                onClick={() => setDeleteConfirmationCheckbox(!deleteConfirmationCheckbox)}
              />
            </FormRow>
            <AccountFormButtonsWrapper>
              <DangerButton
                inverted
                type='submit'
                disabled={!deletingAccount || deleteConfirmationPassword.length === 0 || !deleteConfirmationCheckbox}>
                <FontAwesomeIcon icon={faTrash} fixedWidth />
                Delete Forever
              </DangerButton>
              <Button inverted type='button' onClick={() => resetAccountDeletion()}>
                <FontAwesomeIcon icon={faTimes} fixedWidth />
                Cancel
              </Button>
            </AccountFormButtonsWrapper>
          </AccountForm>
        </React.Fragment>
      )}
    </StyledAccount>
  );
};

export default Account;
