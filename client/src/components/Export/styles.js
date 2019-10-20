import styled from 'styled-components';

export const StyledExport = styled.main`
  width: 50%;
  margin: 4rem auto 1rem;
  border: 1px solid lightgrey;
  border-bottom: 2px solid lightgrey;
  border-right: 2px solid lightgrey;
  padding: 2rem;

  button {
    margin-top: 2rem;
    margin-right: 0.5rem;
  }
`;

export const ExportTextArea = styled.textarea`
  width: 100%;
  height: 50vh;
  padding: 1rem 5rem;
  border-radius: 5px;
  resize: none;
  line-height: 150%;
  letter-spacing: 0.1rem;
`;
