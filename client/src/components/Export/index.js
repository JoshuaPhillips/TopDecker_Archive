import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../../shared/Headers';

import { StyledExport, ExportTextArea } from './styles';
import { Button } from '../../shared/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Export = props => {
  const {
    location: {
      state: { deck }
    }
  } = props;

  const textAreaElement = useRef(null);

  const generateExportString = () => {
    let exportString = '';

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

    return exportString;
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
      <SectionHeader>Export card list for '{deck.name}'</SectionHeader>
      <form>
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
