import React, { useState } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_COMMANDER_SEARCH_RESULTS, CREATE_NEW_DECK } from './graphql';
import { GET_DECK_LIST } from '../graphql';

const AddDeckForm = props => {
  const [name, setName] = useState('');
  const [format, setFormat] = useState('standard');
  const [commander, setCommander] = useState({ name: '', id: '' });
  const [commanderSearchResults, setCommanderSearchResults] = useState([]);

  const GetCommanderSearchResultsQueryResponse = useQuery(GET_COMMANDER_SEARCH_RESULTS, {
    skip: !commander.name || commander.name.length <= 2,
    variables: {
      searchParams: {
        name: commander.name,
        is: 'commander'
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
    refetchQueries: [{ query: GET_DECK_LIST }],
    onCompleted(data) {
      props.history.push(`/decks/${data.createDeck.id}`);
    }
  });

  const checkFormValidity = () => {
    if (name.length < 4) {
      return false;
    }

    switch (format) {
      case 'commander':
        if (commander.id === '' || commander.id === null || commander.id === undefined) {
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
      case 'input-change':
        setCommander({ ...commander, name: inputValue });
        break;

      default:
        return;
    }
  };

  // Handle the event listener when a dropdown option is selected
  const handleCommanderOptionSelect = (option, action) => {
    switch (action.action) {
      case 'select-option':
        setCommander({ name: option.label, id: option.value });
        break;

      case 'clear':
        setCommander({ name: '', id: '' });
        setCommanderSearchResults([]);
        break;

      default:
        return;
    }
  };

  return (
    <form>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />

      <label htmlFor='format'>Format</label>
      <select id='format' value={format} onChange={e => setFormat(e.target.value)}>
        <option value='standard'>Standard</option>
        <option value='modern'>Modern</option>
        <option value='commander'>Commander</option>
      </select>

      {format === 'commander' && (
        <React.Fragment>
          <label htmlFor='commander'>Commander</label>
          <Select
            id='commander'
            onChange={handleCommanderOptionSelect}
            onInputChange={handleCommanderInputChange}
            options={commanderSearchResults}
            isClearable
            placeholder='Name of your Commander?'
            noOptionsMessage={() => 'No Results Found.'}
          />
        </React.Fragment>
      )}

      <button type='button' disabled={!checkFormValidity()} onClick={() => CreateNewDeckMutation()}>
        Create
      </button>
    </form>
  );
};

export default withRouter(AddDeckForm);
