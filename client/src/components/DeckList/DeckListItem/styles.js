import styled from 'styled-components';

export const StyledDeckListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 1rem;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    transform: scale(1.01);
    box-shadow: 5px 5px 7px #c7c7c7;
  }

  .DeckListItemMeta {
    margin-right: auto;
    h2 {
      text-transform: uppercase;
      font-weight: ${props => props.theme.fonts.weights.bold};
    }

    p {
      font-style: italic;
      font-size: ${props => props.theme.fonts.sizes.small};
    }
  }

  .DeckListItemCardCount {
    margin-right: 1rem;
  }
`;
