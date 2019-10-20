import React from 'react';

import convertTextToSymbols from '../../../utils/convertTextToSymbols';

import SearchResultCardControls from '../SearchResultCardControls';

import {
  StyledSearchResultTextItem,
  TextModeCardItemHeader,
  TextModeCardItemContent,
  TextModeCardItemOracleText,
  TextModeCardItemFlavorText,
  SearchResultCardControlsWrapper
} from './styles';

const SearchResultTextItem = props => {
  const { deck, result, updateCardListHandler } = props;

  return (
    <StyledSearchResultTextItem>
      {result.card_faces.length === 0 ? (
        <React.Fragment>
          <TextModeCardItemHeader>
            <p>{result.name.trim()}</p>
            {result.mana_cost && result.mana_cost.length !== 0 && convertTextToSymbols(result.mana_cost)}
          </TextModeCardItemHeader>
          <TextModeCardItemContent>
            <div>
              <p>{result.type_line}</p>
            </div>
            {result.oracle_text !== null && (
              <TextModeCardItemOracleText>{convertTextToSymbols(result.oracle_text)}</TextModeCardItemOracleText>
            )}
            {result.power && result.toughness ? (
              <div>
                <p>
                  {result.power} / {result.toughness}
                </p>
                {result.loyalty && <p>{result.loyalty}</p>}
              </div>
            ) : null}
            {result.flavor_text && result.flavor_text.length !== 0 && (
              <TextModeCardItemFlavorText>
                <p>{result.flavor_text}</p>
              </TextModeCardItemFlavorText>
            )}
          </TextModeCardItemContent>
        </React.Fragment>
      ) : (
        result.card_faces.map(card_face => {
          return (
            <React.Fragment key={`${result.scryfall_id}__${card_face.name}`}>
              <TextModeCardItemHeader>
                <p>{card_face.name}</p>
                {card_face.mana_cost.length !== 0 && convertTextToSymbols(card_face.mana_cost)}
              </TextModeCardItemHeader>
              <TextModeCardItemContent>
                <div>
                  <p>{card_face.type_line}</p>
                </div>
                {card_face.oracle_text !== null && (
                  <TextModeCardItemOracleText>{convertTextToSymbols(card_face.oracle_text)}</TextModeCardItemOracleText>
                )}
                {card_face.power && card_face.toughness && (
                  <div>
                    <p>
                      {card_face.power} / {card_face.toughness}
                    </p>
                  </div>
                )}
                {card_face.loyalty && (
                  <div>
                    <p>Starting Loyalty: {card_face.loyalty}</p>
                  </div>
                )}
                {card_face.flavor_text && card_face.flavor_text.length !== 0 && (
                  <TextModeCardItemFlavorText>
                    <p>{card_face.flavor_text}</p>
                  </TextModeCardItemFlavorText>
                )}
              </TextModeCardItemContent>
            </React.Fragment>
          );
        })
      )}
      <SearchResultCardControlsWrapper>
        <SearchResultCardControls deck={deck} result={result} updateCardList={updateCardListHandler} />
      </SearchResultCardControlsWrapper>
    </StyledSearchResultTextItem>
  );
};

export default SearchResultTextItem;
