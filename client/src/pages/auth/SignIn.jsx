import { useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import OAuth from '../../components/OAuth';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import firebase from 'firebase/compat/app';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        setPersistence(auth, browserLocalPersistence);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      console.log('Bad User Credentials');
    }
  };

  return (
    <>
      <div className="pageContainer">
        <div className="oAuth">
          <header>
            <p className="pageHeader">Sign in to Copilot 😎</p>
          </header>
          <OAuth />
        </div>
        <form className="signinForm" onSubmit={onSubmit}>
          <div className="seperatorText">
            <span>Or sign in with your email</span>
          </div>

          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword(prevState => !prevState)}
            />
          </div>

          <div className="signInBar">
            <button className="signInButton">
              <p className="signInText">Continue with Email</p>
            </button>
          </div>
          <div className="forgotPasswordLink otherLinks">
            <Link to="/sign-up" className="registerLink">
              Don't have an account yet? <span>Get started here</span>
            </Link>
            {/* <Link to="/forgot-password" className="forgotPasswordLink">
              I forgot my password
            </Link> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
