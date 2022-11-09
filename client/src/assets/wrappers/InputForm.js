import styled from 'styled-components';

const Wrapper = styled.main`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  .input-card {
    overflow-y: auto;
  }

  .ck-content {
    padding-left: 1rem;
    height: 90vw;
  }

  .editor {
    grid-template-columns: 1fr;
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 100%;
    border-bottom: 2px;
    border-color: black;
  }

  .form-center h4 {
    text-align: left;
  }

  .bodyText {
    text-align: left;
    margin-top: 1rem;
    padding: 0 1rem 0 1rem;
  }

  .form-center {
    align-items: center;
    padding: 1rem;
  }
  .form-center label {
    text-align: left;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    height: 90vh;
    overflow: hidden;
    width: 100%;
  }
`;

export default Wrapper;
