import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import './pricing.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Wrapper from '../../assets/wrappers/PricingWrapper.js';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useAppContext } from '../../context/appContext';
import { db } from '../../firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from 'react-spinners/RiseLoader';

// Firebase Imports
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
  getDoc,
} from 'firebase/firestore';

// Stripe / Auth Services
import { loadStripe } from '@stripe/stripe-js';
import AuthService from '../../services/Auth.service.js';
import { useAuthStatus } from '../../hooks/useAuthStatus.js';

const PricingPage = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [canPurchase, setCanPurchase] = useState(true);
  const [isYearlyPlanActive, setIsYearlyPlanActive] = useState(false);
  const [isCanPurchaseSet, setIsCanPurchaseSet] = useState(false);

  const notify = () =>
    toast('🚀 Loading Secure Checkout!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  useEffect(async () => {
    if (checkingStatus) {
      return;
    }
    if (loggedIn && !isCanPurchaseSet) {
      const result = await AuthService.doesUserHaveActiveSubscription();
      const yearlyActive = await AuthService.doesUserHaveAnnualSubscription();
      setIsYearlyPlanActive(yearlyActive);
      setCanPurchase(!result);
      setIsCanPurchaseSet(true);
    }
  }, [checkingStatus, loggedIn]);

  async function getProductsAndPrices() {
    const dbQuery = query(
      collection(db, 'products'),
      where('active', '==', true)
    );

    const querySnapshot = await getDocs(dbQuery);

    querySnapshot.forEach(async function (doc) {
      console.log(doc.id, ' => ', doc.data());
      const priceSnap = await getDocs(collection(doc.ref, 'prices'));
      priceSnap.docs.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
      });
    });
  }

  async function startCheckoutSession() {
    notify();
    const userCheckoutCollection = collection(
      db,
      `users/${getAuth().currentUser.uid}/checkout_sessions`
    );

    const docRef = await addDoc(userCheckoutCollection, {
      price: 'price_1MMpuJLgWWC0lfdoQyz5KKIa',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async snap => {
      const { sessionId } = snap.data();

      if (sessionId) {
        console.log('Ready for starting checkout process');
        const stripe = await loadStripe(
          'pk_live_zp7u9YDsT6HrrwHs3UVQVmXN00SZrKzQp5'
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  }

  async function startAnnualCheckoutSession() {
    notify();
    const userCheckoutCollection = collection(
      db,
      `users/${getAuth().currentUser.uid}/checkout_sessions`
    );

    const docRef = await addDoc(userCheckoutCollection, {
      price: 'price_1MNgcfLgWWC0lfdo070ghCWc',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async snap => {
      const { sessionId } = snap.data();

      if (sessionId) {
        console.log('Ready for starting checkout process');
        const stripe = await loadStripe(
          'pk_live_zp7u9YDsT6HrrwHs3UVQVmXN00SZrKzQp5'
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  }

  useEffect(() => {
    // getProductsAndPrices();
  }, []);

  return (
    <Wrapper className="mainwrapper">
      <div className="Header">
        <div className="main-header">
          Get <span style={{ color: '#7d5ff5' }}>Unlimited</span> Access to
          Copilot 🚀
        </div>
        <div className="sub-header">
          <span style={{ color: '#7d5ff5', fontWeight: '700' }}>
            Turbocharge
          </span>{' '}
          your productivity inside and outside of the classroom!
        </div>
      </div>
      <Card
        className="pricing"
        sx={{
          width: '100%',
          maxWidth: '500px',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <CardContent style={{ margin: '1rem' }}>
          <div>
            <div className="form-center" style={{ paddingBottom: '1rem' }}>
              <h4
                className="type-monthly"
                style={{
                  fontFamily: 'inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0',
                  marginBottom: '1rem',
                }}
              >
                Monthly
              </h4>
              <a
                style={{
                  fontFamily: 'inter',
                  fontSize: '56px',
                  fontWeight: '800',
                }}
              >
                $9
              </a>
              <a
                style={{
                  color: 'gray',
                  fontFamily: 'inter',
                }}
              >
                /mo
              </a>
            </div>
          </div>
          <div className="bodyText">
            <h5
              style={{
                fontFamily: 'inter',
                fontSize: '16px',
                color: 'gray',
                fontWeight: '400',
                letterSpacing: '0.3px',
              }}
            >
              Unlimited access to all of Copilot's tools, upgraded storage
              capacity, expedited support + tool request.
            </h5>
            <p style={{ fontFamily: 'inter' }}>
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              15+ AI Templates
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Unlimited Usage
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Support for over 10+ languages
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Chat Support
            </p>
            <Button
              sx={{
                width: '100%',
                maxWidth: '100%',
                textTransform: 'none',
                background: '#7d5ff5',
                fontFamily: 'inter',
                '&:hover': {
                  background: '#7a2ff5',
                },
              }}
              variant="contained"
              disabled={!canPurchase}
              onClick={startCheckoutSession}
            >
              {!canPurchase ? 'Current Active Plan' : 'Get Started'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '100%',
          maxWidth: '500px',
          border: '3px solid #7d5ff5',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
        className="pricing pricing-annual"
      >
        <CardContent style={{ margin: '1rem' }}>
          <div>
            <div className="form-center" style={{ paddingBottom: '1rem' }}>
              <h4
                className="type-annual"
                style={{
                  fontFamily: 'inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0',
                  marginBottom: '1rem',
                }}
              >
                Annual - 30% off
              </h4>
              <a
                style={{
                  fontFamily: 'inter',
                  fontSize: '56px',
                  fontWeight: '800',
                }}
              >
                $5
              </a>
              <a style={{ color: 'gray', fontFamily: 'inter' }}>
                /mo - <span style={{ fontSize: '.8rem' }}>billed annually</span>
              </a>
            </div>
          </div>
          <div className="bodyText">
            <h5
              style={{
                fontFamily: 'inter',
                fontSize: '16px',
                color: 'gray',
                fontWeight: '400',
                letterSpacing: '0.3px',
              }}
            >
              Everything included in the monthly package. Plus early access to
              new tools, features and integrations. All at 30% savings.
            </h5>
            <p style={{ fontFamily: 'inter' }}>
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Access to all future updates!
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              15+ AI Templates
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Unlimited Usage
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Support for over 10+ languages
              <br />
              <IoCheckmarkSharp
                className="checkmark"
                style={{ stroke: '#34cd2b', fontSize: '1.3rem' }}
              />
              Chat Support
            </p>
            <Button
              sx={{
                width: '100%',
                maxWidth: '100%',
                textTransform: 'none',
                background: '#7d5ff5',
                fontFamily: 'inter',
                '&:hover': {
                  background: '#7a2ff5',
                },
              }}
              variant="contained"
              disabled={!canPurchase && !isYearlyPlanActive}
              onClick={startAnnualCheckoutSession}
            >
              {!canPurchase && !isYearlyPlanActive
                ? 'Current Active Plan'
                : 'Get Started'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
};
export default PricingPage;
