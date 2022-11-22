import { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from './Logo';
import { FaAlignLeft } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';

const Navbar = () => {
  const { toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft className="hamburgericon" />
        </button>
        <div>
          <Logo />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
