import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            LEVERAGE <span>AI</span> IN YOUR <span>EDUCATION</span>
          </h1>
          <p>
            PowerLearn offers a suite of digital tools for students, teachers,
            and parents. Our tools are integrated with artificial intelligence
            to become smarter with each use.
          </p>
          <Link to="/register" className="btn btn-hero">
            Try for Free Today
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
