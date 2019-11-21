import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faArrowLeft,
  faFileExport
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { capitalise } from "../../utils/capitalise";

import { StyledExport, ExportTextArea } from "./styles";
import { FormRow, FormRowTitle, FormRowContent } from "../../shared/Forms";
import { SectionHeader } from "../../shared/Headers";
import { Button } from "../../shared/Buttons";

const generateExportString = deck => {
  let exportString = "";

  console.log(deck.cardList);

  if (deck.format === "commander") {
    if (!deck.commander) {
      return;
    }
    exportString += `1 ${
      deck.commander.name
    } (${deck.commander.set.toUpperCase()}) ${
      deck.commander.collector_number
    }\n`;
  }

  deck.cardList.forEach(({ card, mainDeckCount }) => {
    if (!card || !mainDeckCount) {
      return;
    }
    if (mainDeckCount !== 0) {
      exportString += `${mainDeckCount} ${
        card.name
      } (${card.set.toUpperCase()}) ${card.collector_number}\n`;
    }
  });

  exportString += "\n";

  deck.cardList.forEach(({ card, sideboardCount }) => {
    if (!card || !sideboardCount) {
      return;
    }
    if (sideboardCount !== 0) {
      exportString += `${sideboardCount} ${
        card.name
      } (${card.set.toUpperCase()}) ${card.collector_number}\n`;
    }
  });

  return exportString.trim();
};

const copyExportToClipboard = newText => {
  navigator.clipboard.writeText(newText).then(
    () => {
      toast.info("Deck list successfully copied.");
    },
    () => {
      toast.info("Sorry, there was a problem copying your deck list.");
    }
  );
};

const Export = props => {
  const {
    location: {
      state: { deck }
    }
  } = props;

  const textAreaElement = useRef(null);

  return (
    <StyledExport>
      <SectionHeader>
        <FontAwesomeIcon icon={faFileExport} fixedWidth />
        Export card list
      </SectionHeader>
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

        {deck.format === "commander" && (
          <FormRow>
            <FormRowTitle>
              <label>Commander:</label>
            </FormRowTitle>
            <FormRowContent>
              <p>{deck.commander.name}</p>
            </FormRowContent>
          </FormRow>
        )}

        <ExportTextArea
          ref={textAreaElement}
          defaultValue={generateExportString(deck)}
        />
      </form>
      <Button
        type="button"
        onClick={() => copyExportToClipboard(textAreaElement.current.value)}
      >
        <FontAwesomeIcon icon={faClipboard} fixedWidth />
        Copy
      </Button>
      <Link to={`/decks/${deck.id}`}>
        <Button type="button">
          <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
          Back to Deck
        </Button>
      </Link>
    </StyledExport>
  );
};

export default Export;
