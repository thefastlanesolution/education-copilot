import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  background: var(--white);

  .logo {
    display: flex;
    align-items: center;
    width: 150px;
    margin-right: 0px;
  }

  .toggle-btn {
    border: none;
  }

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .hamburgericon {
    font-size: 1.5rem;
    vertical-align: middle;
    color: darkslategray;
  }

  @media (min-width: 992px) {
    display: none !important;
  }
`;
export default Wrapper;
