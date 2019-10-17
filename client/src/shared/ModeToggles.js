import styled from 'styled-components';

export const ModeToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  button {
    flex-grow: 1;
    padding: 0.25rem 0.5rem;
    border: 2px solid ${props => props.theme.colors.primary};
    border-right: 0;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};

    &:disabled {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.background};
    }

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-right: 2px solid ${props => props.theme.colors.primary}
      border-radius: 0 5px 5px 0;
    }
  }
`;
