import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { StyledCardListPlaceholder } from "./styles";

const CardListPlaceholder = props => {
  const { currentUserOwnsDeck } = props;
  return (
    <Link
      to={{
        pathname: "/search",
        state: {
          deck: props.deck
        }
      }}>
      <StyledCardListPlaceholder>
        <h1>
          <FontAwesomeIcon icon={faHeartBroken} fixedWidth />
          <p>Sorry, we couldn't find any cards.</p>
          {currentUserOwnsDeck && <p>Add some using the Quick Search bar to the left or click here.</p>}
        </h1>
      </StyledCardListPlaceholder>
    </Link>
  );
};

export default CardListPlaceholder;
