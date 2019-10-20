import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { capitalise } from '../../utils/capitalise';

import { StyledExport, ExportTextArea } from './styles';
import { FormRow, FormRowTitle, FormRowContent } from '../../shared/Forms';
import { SectionHeader } from '../../shared/Headers';
import { Button } from '../../shared/Buttons';

const Export = props => {
  const {
    location: {
      state: { deck }
    }
  } = props;

  const textAreaElement = useRef(null);

  const generateExportString = () => {
    let exportString = '';

    if (deck.format === 'commander') {
      exportString += `1 ${deck.commander.name} (${deck.commander.set}) ${deck.commander.collector_number}\n`;
    }

    deck.cardList.forEach(({ card, mainDeckCount }) => {
      if (mainDeckCount !== 0) {
        exportString += `${mainDeckCount} ${card.name} (${card.set}) ${card.collector_number}\n`;
      }
    });

    exportString += '\n';

    deck.cardList.forEach(({ card, sideboardCount }) => {
      if (sideboardCount !== 0) {
        exportString += `${sideboardCount} ${card.name} (${card.set}) ${card.collector_number}\n`;
      }
    });

    return exportString.trim();
  };

  const copyExportToClipboard = newText => {
    navigator.clipboard.writeText(newText).then(
      () => {
        toast.info('Deck list successfully copied.');
      },
      () => {
        toast.info('Sorry, there was a problem copying your deck list.');
      }
    );
  };

  return (
    <StyledExport>
      <SectionHeader>Export card list</SectionHeader>
      <form>
        <FormRow>
          <FormRowTitle>
            <label>Deck Name:</label>
          </FormRowTitle>
          <FormRowContent>
            <p>{deck.name}</p>
          </FormRowContent>
        </FormRow>
        <FormRow>
          <FormRowTitle>
            <label>Deck Format:</label>
          </FormRowTitle>
          <FormRowContent>
            <p>{capitalise(deck.format)}</p>
          </FormRowContent>
        </FormRow>

        {deck.format === 'commander' && (
          <FormRow>
            <FormRowTitle>
              <label>Commander:</label>
            </FormRowTitle>
            <FormRowContent>
              <p>{deck.commander.name}</p>
            </FormRowContent>
          </FormRow>
        )}

        <ExportTextArea ref={textAreaElement} defaultValue={generateExportString(deck.cardList)} />
      </form>
      <Button type='button' onClick={() => copyExportToClipboard(textAreaElement.current.value)}>
        <FontAwesomeIcon icon={faClipboard} fixedWidth />
        Copy
      </Button>
      <Link to={`/decks/${deck.id}`}>
        <Button type='button'>
          <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
          Back to Deck
        </Button>
      </Link>
    </StyledExport>
  );
};

export default Export;
