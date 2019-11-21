import React, { useState } from "react";

import AccountDetailsForm from "./AccountDetailsForm";
import PasswordChangeForm from "./PasswordChangeForm";
import DeleteAccountForm from "./DeleteAccountForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faLock,
  faTrash,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

import { StyledAccount, DangerZoneButtonsWrapper } from "./styles";
import { SectionHeader } from "../../shared/Headers";
import { Button, DangerButton } from "../../shared/Buttons";

const Account = () => {
  const [editingPassword, toggleEditingPassword] = useState(false);
  const [deletingAccount, toggleDeletingAccount] = useState(false);

  return (
    <StyledAccount>
      <SectionHeader>
        <FontAwesomeIcon icon={faUserCircle} fixedWidth />
        Account
      </SectionHeader>
      <AccountDetailsForm />
      <SectionHeader danger>
        <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth />
        Danger Zone
      </SectionHeader>

      {!editingPassword && !deletingAccount && (
        <DangerZoneButtonsWrapper>
          <Button
            inverted
            type="button"
            onClick={() => {
              toggleDeletingAccount(false);
              toggleEditingPassword(true);
            }}
          >
            <FontAwesomeIcon icon={faLock} fixedWidth />
            Change Password
          </Button>

          <DangerButton
            type="button"
            onClick={() => {
              toggleEditingPassword(false);
              toggleDeletingAccount(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} fixedWidth />
            Delete Account
          </DangerButton>
        </DangerZoneButtonsWrapper>
      )}

      {editingPassword && (
        <PasswordChangeForm toggleEditingPassword={toggleEditingPassword} />
      )}
      {deletingAccount && (
        <DeleteAccountForm toggleDeletingAccount={toggleDeletingAccount} />
      )}
    </StyledAccount>
  );
};

export default Account;
