import React, { useState } from "react";
import { toast } from "react-toastify";

import Spinner from "../Spinner";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ACCOUNT_DETAILS, SAVE_ACCOUNT_DETAILS } from "./graphql";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { AccountForm, AccountFormButtonsWrapper } from "./styles";
import {
  FormRow,
  FormRowTitle,
  FormRowContent,
  TextInput
} from "../../shared/Forms";
import { Button } from "../../shared/Buttons";

const initialAccountDetails = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  avatarUrl: ""
};

const AccountDetailsForm = props => {
  const [accountDetails, setAccountDetails] = useState(initialAccountDetails);
  const [editing, toggleEditing] = useState(false);

  const GetAccountDetailsQueryResponse = useQuery(GET_ACCOUNT_DETAILS, {
    onCompleted() {
      if (GetAccountDetailsQueryResponse.data) {
        const {
          firstName,
          lastName,
          username,
          email,
          avatarUrl
        } = GetAccountDetailsQueryResponse.data.getCurrentUser;
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
    onCompleted() {
      toast.info("Account details saved.");
    },
    onError() {
      toast.error("Sorry, there was an error updating your info.");
    }
  });

  const enableEditing = e => {
    e.preventDefault();
    toggleEditing(true);
  };

  const saveAccountDetailsHandler = e => {
    e.preventDefault();
    SaveAccountDetailsMutation({
      variables: {
        newDetails: {
          ...accountDetails
        }
      }
    });
    toggleEditing(false);
  };

  if (GetAccountDetailsQueryResponse.loading) {
    return <Spinner />;
  }

  return (
    <AccountForm
      onSubmit={
        editing ? e => saveAccountDetailsHandler(e) : e => toggleEditing(e)
      }
    >
      <FormRow>
        <FormRowTitle>
          <label htmlFor="firstName">First Name:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            id="firstName"
            value={accountDetails.firstName}
            onChange={e =>
              setAccountDetails({
                ...accountDetails,
                firstName: e.target.value
              })
            }
            readOnly={!editing}
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <FormRowTitle>
          <label htmlFor="lastName">Last Name:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            id="lastName"
            value={accountDetails.lastName}
            onChange={e =>
              setAccountDetails({
                ...accountDetails,
                lastName: e.target.value
              })
            }
            readOnly={!editing}
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <FormRowTitle>
          <label htmlFor="username">Username:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            id="username"
            value={accountDetails.username}
            onChange={e =>
              setAccountDetails({
                ...accountDetails,
                username: e.target.value
              })
            }
            readOnly={!editing}
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <FormRowTitle>
          <label htmlFor="email">Email:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="email"
            id="email"
            value={accountDetails.email}
            onChange={e =>
              setAccountDetails({ ...accountDetails, email: e.target.value })
            }
            readOnly={!editing}
          />
        </FormRowContent>
      </FormRow>

      <FormRow>
        <FormRowTitle>
          <label htmlFor="avatarUrl">Avatar Url:</label>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="url"
            id="avatarUrl"
            value={accountDetails.avatarUrl}
            onChange={e =>
              setAccountDetails({
                ...accountDetails,
                avatarUrl: e.target.value
              })
            }
            readOnly={!editing}
          />
        </FormRowContent>
      </FormRow>

      <AccountFormButtonsWrapper>
        {editing ? (
          <Button type="submit">
            <FontAwesomeIcon icon={faEdit} fixedWidth />
            Save
          </Button>
        ) : (
          <Button type="button" onClick={e => enableEditing(e)}>
            <FontAwesomeIcon icon={faEdit} fixedWidth />
            Edit
          </Button>
        )}
      </AccountFormButtonsWrapper>
    </AccountForm>
  );
};

export default AccountDetailsForm;
