import React from "react";
import CardItemControls from "../CardItemControls";

import convertTextToSymbols from "../../../../utils/convertTextToSymbols";
import {
  StyledTextModeCardItem,
  TextModeCardItemHeader,
  TextModeCardItemContent,
  TextModeCardItemOracleText,
  TextModeCardItemFlavorText
} from "./styles";

const TextModeCardItem = props => {
  const {
    cardWithCounts: { card, mainDeckCount, sideboardCount },
    deck,
    type,
    totalMainDeckCount,
    totalSideboardCount,
    updateCardListHandler,
    currentUserOwnsDeck
  } = props;

  return (
    <StyledTextModeCardItem>
      {card.card_faces.length === 0 ? (
        <>
          <TextModeCardItemHeader>
            <p>{card.name.trim()}</p>
            {card.mana_cost && card.mana_cost.length !== 0 && convertTextToSymbols(card.mana_cost)}
            {card.mana_cost && card.mana_cost.length === 0 && "-"}
          </TextModeCardItemHeader>
          <TextModeCardItemContent>
            <div>
              <p>{card.type_line}</p>
            </div>
            {card.oracle_text !== null && (
              <TextModeCardItemOracleText>{convertTextToSymbols(card.oracle_text)}</TextModeCardItemOracleText>
            )}
            {card.power && card.toughness ? (
              <div>
                <p>
                  {card.power} / {card.toughness}
                </p>
                {card.loyalty && <p>{card.loyalty}</p>}
              </div>
            ) : null}
            {card.flavor_text && card.flavor_text.length !== 0 && (
              <TextModeCardItemFlavorText>
                <p>{card.flavor_text}</p>
              </TextModeCardItemFlavorText>
            )}
          </TextModeCardItemContent>
        </>
      ) : (
        card.card_faces.map(card_face => {
          return (
            <React.Fragment key={`${card.scryfall_id}__${card_face.name}`}>
              <TextModeCardItemHeader>
                <p>{card_face.name}</p>
                {card_face.mana_cost.length !== 0 ? convertTextToSymbols(card_face.mana_cost) : "-"}
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
      <CardItemControls
        type={type}
        deck={deck}
        currentUserOwnsDeck={currentUserOwnsDeck}
        updateCardListHandler={updateCardListHandler}
        card={card}
        mainDeckCount={mainDeckCount}
        sideboardCount={sideboardCount}
        totalMainDeckCount={totalMainDeckCount}
        totalSideboardCount={totalSideboardCount}
      />
    </StyledTextModeCardItem>
  );
};

export default TextModeCardItem;
