import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './Logo.css';
import Wrapper from '../assets/wrappers/BigSidebar';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();

  const navigate = useNavigate();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo className="logo" />
          </header>
          <NavLinks />
          <div className="upgradebtn-container">
            <button
              className="upgrade-btn"
              onClick={() => navigate('/pricing')}
            >
              Upgrade to Pro
            </button>
          </div>
          <div className="bigsidebar-footer">
            <div className="policytxt">
              <a
                a
                target="_blank"
                rel="noopener noreferrer"
                href="https://educationcopilot.com/privacy-policy/"
              >
                Privacy Policy
              </a>
            </div>
            <div className="policytxt">
              <a
                a
                target="_blank"
                rel="noopener noreferrer"
                href="https://educationcopilot.com/terms-of-service/"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-center"></div>
    </Wrapper>
  );
};

export default BigSidebar;
