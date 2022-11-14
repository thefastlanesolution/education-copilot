import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 992px) {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;
  }

  // FONT MANIPULATIONS

  .Header {
    grid-column: 1 / -1;
    text-align: center;
    margin-top: 10vh;
    margin-bottom: 1.5rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3rem;
    font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
      'Roboto Condensed', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans',
      'Helvetica Neue', sans-serif;
  }

  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }

  .type {
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  // CARD MANIPULATIONS

  .pricing {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    margin-top: 1.5rem;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  }

  // Resizing of how many tools fit in one row
  @media (min-width: 992px) {
    .pricing {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 1.7rem;
    }
  }

  //This adds a 7vh margin-top & centers the SECOND Pricing Card on mobile
  @media (max-width: 992px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.pricing.css-irnhf5-MuiPaper-root-MuiCard-root {
      margin-top: 7vh;
      margin-left: auto;
      margin-right: auto;
    }
  }

  //This centers the FIRST Pricing Card on mobile
  @media (max-width: 992px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.pricing.css-1qfymfz-MuiPaper-root-MuiCard-root {
      margin-left: auto;
      margin-right: auto;
    }
  }

  // This pushes the FIRST card to the center of the page on desktop!
  @media (min-width: 992px) {
    .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.pricing.css-1qfymfz-MuiPaper-root-MuiCard-root {
      margin-left: auto;
      margin-right: 0;
    }
  }
`;
export default Wrapper;
