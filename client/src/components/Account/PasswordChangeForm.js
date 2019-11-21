import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import {
  FormRow,
  FormRowTitle,
  FormRowContent,
  TextInput
} from "../../shared/Forms";
import { Button } from "../../shared/Buttons";
import { AccountForm, AccountFormButtonsWrapper } from "./styles";

import { CHANGE_PASSWORD } from "./graphql";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  passwordDetails: {
    currentPassword: "",
    newPassword: "",
    confirmationPassword: ""
  }
};

const PasswordChangeForm = props => {
  const { toggleEditingPassword } = props;
  const [passwordDetails, setPasswordDetails] = useState(
    initialState.passwordDetails
  );

  const [ChangePasswordMutation] = useMutation(CHANGE_PASSWORD, {
    //set no-cache so that we don't save the user's password in the browser.
    fetchPolicy: "no-cache",
    onCompleted() {
      toast.info("Password saved.");
    },
    onError() {
      toast.error("Sorry, we couldn't update your password.");
    }
  });

  const resetPasswordDetails = () => {
    setPasswordDetails(initialState.passwordDetails);
  };

  const cancelPasswordChange = () => {
    toggleEditingPassword(false);
    resetPasswordDetails();
  };

  const submitPasswordChange = e => {
    e.preventDefault();
    ChangePasswordMutation({
      variables: passwordDetails
    });
    resetPasswordDetails();
  };

  return (
    <AccountForm onSubmit={e => submitPasswordChange(e)}>
      <FormRow>
        <FormRowTitle>
          <label htmlFor="currentPassword">Current Password:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="password"
            id="currentPassword"
            value={passwordDetails.currentPassword}
            onChange={e =>
              setPasswordDetails({
                ...passwordDetails,
                currentPassword: e.target.value
              })
            }
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <FormRowTitle>
          <label htmlFor="newPassword">New Password:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="password"
            id="newPassword"
            value={passwordDetails.newPassword}
            onChange={e =>
              setPasswordDetails({
                ...passwordDetails,
                newPassword: e.target.value
              })
            }
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <FormRowTitle>
          <label htmlFor="confirmationPassword">Confirm New Password:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="password"
            id="confirmationPassword"
            value={passwordDetails.confirmationPassword}
            onChange={e =>
              setPasswordDetails({
                ...passwordDetails,
                confirmationPassword: e.target.value
              })
            }
          />
        </FormRowContent>
      </FormRow>
      <AccountFormButtonsWrapper>
        <Button
          inverted
          type="submit"
          disabled={
            passwordDetails.currentPassword.length === 0 ||
            passwordDetails.newPassword.length === 0 ||
            passwordDetails.confirmationPassword.length === 0
          }
        >
          <FontAwesomeIcon icon={faCheck} fixedWidth />
          Confirm
        </Button>
        <Button inverted type="button" onClick={() => cancelPasswordChange()}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
          Cancel
        </Button>
      </AccountFormButtonsWrapper>
    </AccountForm>
  );
};

export default PasswordChangeForm;
