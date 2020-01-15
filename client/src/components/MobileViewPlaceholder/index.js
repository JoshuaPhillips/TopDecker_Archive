import React from "react";

import { StyledMobileViewPlaceholder } from "./styles";

const MobileViewPlaceholder = () => {
  return (
    <StyledMobileViewPlaceholder>
      <h1>Welcome to TopDecker</h1>
      <h2>Sorry, this site is optimised for desktop view only at the moment.</h2>

      <h2>If you think this message is being displayed by mistake, please refresh the page.</h2>
    </StyledMobileViewPlaceholder>
  );
};

export default MobileViewPlaceholder;
