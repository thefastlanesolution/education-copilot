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
import { db, functions } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { httpsCallable } from 'firebase/functions';
import AuthService from '../../services/Auth.service';
import dayjs from 'dayjs';
dayjs().format();

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const getSubscription = async () => {
      const subscription = await AuthService.getUserSubscriptionDetails();
      setSubscriptionData(subscription);
    };

    getSubscription();
  }, []);

  function calculateCurrentPlanCost() {
    if (subscriptionData) {
      console.log(subscriptionData);
      const price = subscriptionData.items[0].plan.amount;
      return `$${price / 100} `;
    }
    return '$0.00 ';
  }

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

  const redirectToCustomerPortal = async () => {
    console.log(functions);
    // TODO: We need to deactivate cors in local while testing for localhost domain
    const functionRef = httpsCallable(
      functions,
      'ext-firestore-stripe-payments-createPortalLink'
    );

    const { data } = await await functionRef({
      returnUrl: window.location.origin,
      locale: 'auto', // Optional, defaults to "auto"
    });

    window.location.assign(data.url);
  };

  function calculateNextBillingDate() {
    if (subscriptionData) {
      const date = dayjs(
        new Date(subscriptionData.current_period_end.seconds * 1000)
      );
      console.log(date);
      return date.format('MM/DD/YYYY');
    }
    return 'N/A';
  }
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
            <div className="currentplan-plan">
              {/* FIXME/TODO : In the future, with multiple plans, it'll be better to just get the plan type from the AuthService or a dedicated SubscriptionService */}
              {subscriptionData ? 'Pro Plan' : 'Free Plan'}
            </div>
          </div>
          <div className="nextbill">
            <div className="nextbill-text">Next Billing Date</div>
            <div className="nextbill-date">{calculateNextBillingDate()}</div>
          </div>
          <div className="planprice">
            <div className="planprice-text">Monthly Charge</div>
            <div className="planprice-price">
              {calculateCurrentPlanCost()}
              <span className="monthtext">/ Month</span>
            </div>
          </div>
          {/* Add dynamic buttons here, upgrade plan, subscribe, etc */}
          {subscriptionData && (
            <div className="updateplan" onClick={redirectToCustomerPortal}>
              <button className="updateplan-btn">Billing Details</button>
            </div>
          )}
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
