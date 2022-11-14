import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import OAuth from '../components/OAuth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import './SignUp.css';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <>
      <div className="signUpPageContainer">
        <div className="signUpoAuth">
          <header>
            <p className="signUpPageHeader">Sign Up for Copilot 🚀</p>
          </header>
          <OAuth />
        </div>
        <form className="signUpForm" onSubmit={onSubmit}>
          <div className="signUpSeperatorText">
            <span>Or sign up with your email</span>
          </div>

          <input
            type="text"
            className="signUpNameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="signUpEmailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="signUpPasswordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="signUpShowPassword"
              onClick={() => setShowPassword(prevState => !prevState)}
            />
          </div>

          <div className="signUpBar">
            <button className="signUpButton">
              <p className="signUpText">Sign Up</p>
            </button>
          </div>
        </form>

        {/* <OAuth /> */}

        <div className="signUpOtherLinks">
          <Link to="/sign-in" className="signUpBack">
            <span>Back to sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
