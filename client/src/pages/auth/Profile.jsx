import { useState, useEffect } from 'react';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings');

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
      console.log('Could not update profile details');
    }
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="profile">
      <header
        className="profileHeader"
        style={{ padding: '1rem 2rem 1rem 2rem' }}
      >
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="main-container">
        <div className="billingCard" style={{ padding: '1rem' }}>
          <div
            style={{
              fontWeight: '600',
              paddingBottom: '.7rem',
              fontSize: '.9rem',
            }}
          >
            Billing
          </div>
          <div className="currentPlan">
            <div className="currentplan-text">Current Plan</div>
            <div className="currentplan-plan">Beta User</div>
          </div>
          <div className="nextbill">
            <div className="nextbill-text">Next Billing Date</div>
            <div className="nextbill-date">N/A</div>
          </div>
          <div className="planprice">
            <div className="planprice-text">Monthly Charge</div>
            <div className="planprice-price">
              $0.00 <span className="monthtext">/ Month</span>
            </div>
          </div>
          {/* <div className="updateplan">
            <button className="updateplan-btn">Update Plan</button>
          </div> */}
        </div>
        <div className="profileCard">
          <div className="profileDetailsHeader">
            <div className="profileDetailsText">Personal Details</div>
            <div
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails(prevState => !prevState);
              }}
            >
              {changeDetails ? 'done' : 'edit'}
            </div>
          </div>
          <form className="editpersonal-form">
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
