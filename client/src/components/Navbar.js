import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
