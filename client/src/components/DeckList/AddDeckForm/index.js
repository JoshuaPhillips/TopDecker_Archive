import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_COMMANDER_SEARCH_RESULTS, CREATE_NEW_DECK } from "./graphql";

import { FormatSelectionWrapper, AddDeckFormButtonsWrapper } from "./styles";
import { FormRow, FormRowTitle, FormRowContent, TextInput } from "../../../shared/Forms";
import { Button } from "../../../shared/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../Checkbox";

const AddDeckForm = props => {
  const [name, setName] = useState("");
  const [format, setFormat] = useState("standard");
  const [commander, setCommander] = useState({ name: "", id: "" });
  const [commanderSearchResults, setCommanderSearchResults] = useState([]);
  const [creatingDeck, setCreatingDeck] = useState(false);

  const { cancelAddDeckHandler } = props;

  const GetCommanderSearchResultsQueryResponse = useQuery(GET_COMMANDER_SEARCH_RESULTS, {
    skip: !commander.name || commander.name.length <= 2,
    variables: {
      searchParams: {
        name: commander.name,
        is: "commander"
      }
    },
    onCompleted() {
      const { cards } = GetCommanderSearchResultsQueryResponse.data.searchCards;

      const results = cards.map(card => {
        return {
          label: card.name,
          value: card.scryfall_id
        };
      });

      setCommanderSearchResults(results);
    }
  });

  const [CreateNewDeckMutation] = useMutation(CREATE_NEW_DECK, {
    variables: {
      deckDetails: {
        name,
        format,
        commander: commander ? commander.id : null
      }
    },
    onCompleted(data) {
      props.history.push(`/decks/${data.createDeck.id}`);
    }
  });

  const createNewDeck = () => {
    setCreatingDeck(true);
    CreateNewDeckMutation();
  };

  const checkFormValidity = () => {
    if (name.length < 4) {
      return false;
    }

    switch (format) {
      case "commander":
        if (commander.id === "" || commander.id === null || commander.id === undefined) {
          return false;
        }
        break;

      default:
        break;
    }

    return true;
  };

  // Handle the event listener when the dropdown search input is changed
  const handleCommanderInputChange = (inputValue, action) => {
    switch (action.action) {
      case "input-change":
        setCommander({ ...commander, name: inputValue });
        break;

      default:
        return;
    }
  };

  // Handle the event listener when a dropdown option is selected
  const handleCommanderOptionSelect = (option, action) => {
    switch (action.action) {
      case "select-option":
        setCommander({ name: option.label, id: option.value });
        break;

      case "clear":
        setCommander({ name: "", id: "" });
        setCommanderSearchResults([]);
        break;

      default:
        return;
    }
  };

  return (
    <>
      <form>
        <FormRow>
          <FormRowTitle>
            <label htmlFor='name'>Name</label>
          </FormRowTitle>
          <FormRowContent>
            <TextInput
              type='text'
              id='name'
              value={name}
              placeholder='Minimum 4 characters'
              onChange={e => setName(e.target.value)}
            />
          </FormRowContent>
        </FormRow>

        <FormRow>
          <FormRowTitle>
            <label htmlFor='format'>Format</label>
          </FormRowTitle>
          <FormRowContent>
            <FormatSelectionWrapper>
              <Checkbox selected={format === "standard"} onClick={() => setFormat("standard")}>
                Standard
              </Checkbox>
              <Checkbox selected={format === "modern"} onClick={() => setFormat("modern")}>
                Modern
              </Checkbox>
              <Checkbox selected={format === "commander"} onClick={() => setFormat("commander")}>
                Commander
              </Checkbox>
            </FormatSelectionWrapper>
          </FormRowContent>
        </FormRow>

        {format === "commander" && (
          <FormRow>
            <FormRowTitle>
              <label htmlFor='commander'>Commander</label>
            </FormRowTitle>
            <FormRowContent>
              <Select
                id='commander'
                onChange={handleCommanderOptionSelect}
                onInputChange={handleCommanderInputChange}
                options={commanderSearchResults}
                isClearable
                placeholder='Name of your Commander?'
                noOptionsMessage={() => "No Results Found."}
              />
            </FormRowContent>
          </FormRow>
        )}
      </form>

      <AddDeckFormButtonsWrapper>
        <Button type='button' disabled={!checkFormValidity() || creatingDeck} onClick={() => createNewDeck()}>
          <FontAwesomeIcon icon={faPlus} fixedWidth />
          {creatingDeck ? "Loading..." : "Create"}
        </Button>
        <Button type='button' onClick={() => cancelAddDeckHandler()} disabled={creatingDeck}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
          Cancel
        </Button>
      </AddDeckFormButtonsWrapper>
    </>
  );
};

export default withRouter(AddDeckForm);
