import React from "react";

import { validateAddCard } from "../../../../utils/validateAddCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { StyledSidebarSearchResult } from "./styles";

const SidebarSearchResult = props => {
  const { deck, card, list, addCardHandler, selectResult } = props;

  const available = validateAddCard(deck, card, list);

  return (
    <StyledSidebarSearchResult unavailable={!available}>
      <div
        onClick={available ? () => addCardHandler(deck, list, "add", card) : null}
        className='SidebarSearchResultHeader'>
        <p>{card.name}</p>

        <div>
          <FontAwesomeIcon
            icon={faEye}
            onClick={e => {
              e.stopPropagation();
              selectResult(card);
            }}
          />
        </div>
      </div>
    </StyledSidebarSearchResult>
  );
};

export default SidebarSearchResult;
