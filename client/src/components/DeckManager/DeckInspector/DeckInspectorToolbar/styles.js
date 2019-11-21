import styled from "styled-components";
import { Mana } from "@saeris/react-mana";

export const StyledDeckInspectorToolbar = styled.div.attrs(props => ({
  disabled: props.disabled
}))`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: ${props => props.theme.borders.standard}
  border-bottom: ${props => props.theme.borders.thick};

  .DeckInspectorToolbarHeader {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid ${props => props.theme.colors.deepBlue};

    h1 {
      text-transform: uppercase;
      color: ${props =>
        props.danger
          ? props.theme.colors.fireBrick
          : props.theme.colors.deepBlue};
      font-size: ${props => props.theme.fonts.sizes.extraLarge};
      font-weight: ${props => props.theme.fonts.weights.bold};
    }

    p {
      font-weight: ${props => props.theme.fonts.weights.bold};
    }

    button {
      margin: 0 0 0 0.5rem;
    }
  }
`;

export const DeckInspectorToolbarControls = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  width: 100%;
`;

export const DeckInspectorControlGroup = styled.div`
  text-align: center;
  width: 33%;

  p {
    margin: 0.5rem 0;
    font-weight: ${props => props.theme.fonts.weights.bold};
  }
`;

export const CardTypeFilterIcon = styled(Mana)`
  margin: 0 0.25rem;
  cursor: pointer;

  color: ${props =>
    props.disabled ? "lightgrey" : props.theme.colors.deepBlue};
`;
