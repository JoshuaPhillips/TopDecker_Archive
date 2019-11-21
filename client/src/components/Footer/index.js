import React from "react";

import { StyledFooter } from "./styles";

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        &copy; Joshua Phillips, 2019. TopDecker is unofficial Fan Content
        permitted under the Wizard's of The Coast Fan Content Policy. Not
        approved / endorsed by Wizards. Portions of the materials used are
        property of Wizards of the Coast. &copy; Wizards of the Coast LLC.
        TopDecker fetches data from the{" "}
        <a href="https://www.scryfall.com" noreferral noopener target="__blank">
          Scryfall API
        </a>
        , All Rights Reserved.
      </p>
    </StyledFooter>
  );
};

export default Footer;
