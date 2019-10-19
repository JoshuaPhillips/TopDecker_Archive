import styled from 'styled-components';

export const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 0.5rem;
    border: 1px solid lightgrey;
    color: ${props => (props.selected ? props.theme.colors.primary : props.theme.colors.background)};
    transition: all 0.1s ease-in-out;
  }

  label {
    cursor: pointer;
  }
`;
