import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_ACCOUNT, LOGOUT } from "./graphql";

import Checkbox from "../Checkbox";

import {
  AccountForm,
  AccountFormButtonsWrapper,
  DeleteConfirmationMessage
} from "./styles";
import { Button, DangerButton } from "../../shared/Buttons";
import {
  FormRow,
  FormRowTitle,
  FormRowContent,
  TextInput
} from "../../shared/Forms";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

const initialDeleteConfirmationPassword = "";
const initialDeleteConfirmationCheckbox = false;

const DeleteAccountForm = props => {
  const { toggleDeletingAccount } = props;
  const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState(
    initialDeleteConfirmationPassword
  );
  const [deleteConfirmationCheckbox, setDeleteConfirmationCheckbox] = useState(
    initialDeleteConfirmationCheckbox
  );

  const [LogoutMutation] = useMutation(LOGOUT);
  const [DeleteAccountMutation] = useMutation(DELETE_ACCOUNT, {
    onCompleted() {
      toast.info("Account deleted.");
    },
    onError() {
      toast.error("Sorry, we couldn't delete your account.");
    }
  });

  const resetAccountDeletion = () => {
    setDeleteConfirmationPassword(initialDeleteConfirmationPassword);
    setDeleteConfirmationCheckbox(initialDeleteConfirmationCheckbox);
  };

  const cancelAccountDeletion = () => {
    resetAccountDeletion();
    toggleDeletingAccount(false);
  };

  const deleteAccount = e => {
    e.preventDefault();
    DeleteAccountMutation({
      variables: {
        password: deleteConfirmationPassword
      }
    });
    toggleDeletingAccount(false);
    LogoutMutation();
  };

  return (
    <AccountForm onSubmit={e => deleteAccount(e)}>
      <FormRow>
        <FormRowTitle>
          <label htmlFor="accountDeleteConfirmationPassword">
            Enter your Password:
          </label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="password"
            id="accountDeleteConfirmationPassword"
            value={deleteConfirmationPassword}
            onChange={e => setDeleteConfirmationPassword(e.target.value)}
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <DeleteConfirmationMessage>
          Do you really want to delete your account?
        </DeleteConfirmationMessage>
        <Checkbox
          selected={deleteConfirmationCheckbox}
          onClick={() =>
            setDeleteConfirmationCheckbox(!deleteConfirmationCheckbox)
          }
        />
      </FormRow>
      <AccountFormButtonsWrapper>
        <DangerButton
          inverted
          type="submit"
          disabled={
            deleteConfirmationPassword.length === 0 ||
            !deleteConfirmationCheckbox
          }
        >
          <FontAwesomeIcon icon={faTrash} fixedWidth />
          Delete Forever
        </DangerButton>
        <Button inverted type="button" onClick={() => cancelAccountDeletion()}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
          Cancel
        </Button>
      </AccountFormButtonsWrapper>
    </AccountForm>
  );
};

export default DeleteAccountForm;
