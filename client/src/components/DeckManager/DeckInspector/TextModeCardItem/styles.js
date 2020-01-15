import styled from "styled-components";

export const StyledTextModeContainer = styled.div`
  h1 {
    margin: 1rem 0;
  }
`;

export const TextModeCardListContainer = styled.div`
  margin: 1rem 0 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledTextModeCardItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0.5rem 0 0;
  background-color: white;
  border: ${props => props.theme.borders.standard}
  border-top: 3px solid #385170;
  border-bottom: ${props => props.theme.borders.thick};
  border-radius: 5px;

  width: calc((100% - 0.5rem) / 2);

  :nth-child(2n) {
    margin-right: 0;
  }

  @media (min-width: 1000px) {
    width: calc((100% - 1rem) / 3);

    :nth-child(2n) {
      margin-right: 0.5rem;
    }

    :nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1200px) {
    width: calc((100% - 1.5rem) / 4);

    :nth-child(3n) {
      margin-right: 0.5rem;
    }

    :nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1600px) {
    width: calc((100% - 2rem) / 5);

    :nth-child(4n) {
      margin-right: 0.5rem;
    }

    :nth-child(5n) {
      margin-right: 0;
    }
  }
`;

export const TextModeCardItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid lightgrey;
  margin-top: 2rem;
  border-top: 2px solid #385170;
  border-radius: 5px 5px 0 0;

  &:first-child {
    margin-top: 0;
    border-top: none;
  }

  p {
    font-weight: bold;
    min-width: 40%;
    border: none;
    padding: none;
  }

  span {
    text-align: right;
  }
`;

export const TextModeCardItemContent = styled.div`
  border-radius: 0 0 5px 5px;

  div {
    padding: 0.5rem;
    border-bottom: 1px solid lightgrey;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const TextModeCardItemOracleText = styled.div`
  p {
    margin-bottom: 1rem;
    line-height: 150%;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const TextModeCardItemFlavorText = styled.div`
  margin-top: auto;
  p {
    font-style: italic;
    line-height: 150%;
  }
`;
