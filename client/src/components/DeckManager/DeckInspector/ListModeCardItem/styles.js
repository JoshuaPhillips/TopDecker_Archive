import styled from 'styled-components';

export const StyledListModeContainer = styled.div`
  max-height: 100%;
  overflow-y: scroll;

  h1 {
    margin: 1rem 0;
  }
`;

export const StyledListModeCardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 2rem;
`;

export const StyledListModeCardItem = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-bottom: ${props => props.theme.borders.thick};
  background-color: white;
`;

export const ListModeCardDetails = styled.div`
  flex-grow: 8;
  flex-basis: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    flex-grow: 1;
    flex-basis: 0;
    margin: 0 1.5rem 0 0;
  }

  .ListModeName {
    flex-grow: 2;
    font-weight: ${props => props.theme.fonts.weights.bold};
  }

  .ListModeTypeLine {
    flex-grow: 2;
  }

  .ListModeRarity {
    text-align: right;
  }
`;

export const ListModeCardItemControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 2;
  flex-basis: 0;

  p {
    font-weight: bold;
    margin-right: 3rem;
  }

  button {
    margin-left: 0.5rem;
    font-size: 1rem;
    outline: 0;
    border: 0;
    cursor: pointer;
  }
`;
