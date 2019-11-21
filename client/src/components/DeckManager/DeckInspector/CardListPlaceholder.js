import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { StyledCardListPlaceholder } from "./styles";

const CardListPlaceholder = props => {
  const { deck } = props;
  return (
    <StyledCardListPlaceholder>
      <h1>
        <FontAwesomeIcon icon={faHeartBroken} fixedWidth />
        Sorry, we couldn't find any cards. Add some using the Quick Search bar
        to the left or{" "}
        <Link
          to={{
            pathname: "/search",
            state: {
              deck
            }
          }}
        >
          click here.
        </Link>
      </h1>
    </StyledCardListPlaceholder>
  );
};

export default CardListPlaceholder;
