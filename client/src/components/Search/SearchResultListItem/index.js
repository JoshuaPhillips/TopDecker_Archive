import React from 'react';

import SearchResultCardControls from '../SearchResultCardControls';
import convertTextToSymbols from '../../../utils/convertTextToSymbols';
import { capitalise } from '../../../utils/capitalise';

import { StyledSearchResultListItem, ListModeCardDetails, SearchResultCardControlsWrapper } from './styles';

const SearchResultListItem = props => {
  const { deck, result, updateCardListHandler } = props;

  const renderManaCost = () => {
    if (result.mana_cost === null) {
      return result.card_faces.length !== 0 ? convertTextToSymbols(result.card_faces[0].mana_cost) : <p>-</p>;
    } else {
      return convertTextToSymbols(result.mana_cost);
    }
  };

  return (
    <StyledSearchResultListItem>
      <ListModeCardDetails>
        <p className='ListModeName'>{result.name}</p>
        <p className='ListModeTypeLine'>{result.type_line}</p>

        {renderManaCost()}
        <p className='ListModeRarity'>{capitalise(result.rarity)}</p>
      </ListModeCardDetails>
      <SearchResultCardControlsWrapper>
        <SearchResultCardControls deck={deck} result={result} updateCardList={updateCardListHandler} />
      </SearchResultCardControlsWrapper>
    </StyledSearchResultListItem>
  );
};

export default SearchResultListItem;
