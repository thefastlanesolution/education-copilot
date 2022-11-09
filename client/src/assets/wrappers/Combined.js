import styled from 'styled-components';

const Wrapper = styled.main`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 800px) {
    grid-template-columns: 1fr;
    height: 90vh;
    overflow: hidden;
  }
`;

export default Wrapper;
