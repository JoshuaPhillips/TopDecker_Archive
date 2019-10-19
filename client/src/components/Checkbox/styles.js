import styled from 'styled-components';

export const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  span {
    cursor: pointer;
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
    border: 1px solid lightgrey;
    background-color: ${props => (props.selected ? props.theme.colors.primary : 'white')};
  }

  label {
    cursor: pointer;
  }
`;
