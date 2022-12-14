// import React, { useEffect, useState } from 'react';
// import { getAuth } from 'firebase/auth';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Wrapper from '../../assets/wrappers/PricingWrapper.js';
// import { useAppContext } from '../../context/appContext';
// import { db } from '../../firebase.config';
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
//   doc,
//   updateDoc,
//   addDoc,
//   onSnapshot,
//   getDoc,
// } from 'firebase/firestore';
// import { loadStripe } from '@stripe/stripe-js';
// import AuthService from '../../services/Auth.service.js';
// import { useAuthStatus } from '../../hooks/useAuthStatus.js';
// const PricingPage = () => {
//   const { loggedIn, checkingStatus } = useAuthStatus();

//   const [canPurchase, setCanPurchase] = useState(true);
//   const [isCanPurchaseSet, setIsCanPurchaseSet] = useState(false);

//   useEffect(async () => {
//     if (checkingStatus) {
//       return;
//     }
//     if (loggedIn && !isCanPurchaseSet) {
//       const result = await AuthService.doesUserHaveActiveSubscription();
//       setCanPurchase(!result);
//       setIsCanPurchaseSet(true);
//     }
//   }, [checkingStatus, loggedIn]);

//   async function getProductsAndPrices() {
//     const dbQuery = query(
//       collection(db, 'products'),
//       where('active', '==', true)
//     );

//     const querySnapshot = await getDocs(dbQuery);

//     querySnapshot.forEach(async function (doc) {
//       console.log(doc.id, ' => ', doc.data());
//       const priceSnap = await getDocs(collection(doc.ref, 'prices'));
//       priceSnap.docs.forEach(doc => {
//         console.log(doc.id, ' => ', doc.data());
//       });
//     });
//   }

//   async function startCheckoutSession() {
//     const userCheckoutCollection = collection(
//       db,
//       `users/${getAuth().currentUser.uid}/checkout_sessions`
//     );

//     const docRef = await addDoc(userCheckoutCollection, {
//       price: 'price_1M8uFoLgWWC0lfdoJQI2k0I8',
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     });

//     onSnapshot(docRef, async snap => {
//       const { sessionId } = snap.data();

//       if (sessionId) {
//         console.log('Ready for starting checkout process');
//         const stripe = await loadStripe(
//           'pk_live_zp7u9YDsT6HrrwHs3UVQVmXN00SZrKzQp5'
//         );
//         stripe.redirectToCheckout({ sessionId });
//       }
//     });
//   }

//   useEffect(() => {
//     // getProductsAndPrices();
//   }, []);

//   /* {/*
//                href="https://buy.stripe.com/aEUg2aagYbxp29a144"
//               */

//   return (
//     <Wrapper className="mainwrapper">
//       <div className="Header">
//         {!canPurchase
//           ? 'Upgrade your Copilot plan'
//           : 'Try Copilot, free for 5 days'}
//         🎉
//       </div>
//       <Card
//         className="pricing"
//         sx={{
//           width: '100%',
//           maxWidth: '500px',
//           border: 'none',
//           boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
//           borderRadius: '10px',
//           height: '100%',
//           '&:hover': {
//             boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
//           },
//         }}
//       >
//         <CardContent>
//           <form>
//             <div className="form-center">
//               <h4 className="type">For Teachers 🎓</h4>
//             </div>
//           </form>
//           <div className="bodyText">
//             <h5>Features</h5>
//             <p>
//               ✅ Unlock the power of AI in the classroom.
//               <br />
//               ✅ Access to 8 powerful tools.
//               <br />✅ Unlimited Usage
//             </p>
//             <Button
//               sx={{
//                 width: '100%',
//                 maxWidth: '100%',
//               }}
//               variant="contained"
//               disabled={!canPurchase}
//               onClick={startCheckoutSession}
//             >
//               {!canPurchase ? 'Current Active Plan' : 'Start Free Trial'}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//       <Card
//         sx={{
//           width: '100%',
//           maxWidth: '500px',
//           border: 'none',
//           borderRadius: '10px',
//           height: '100%',
//           '&:hover': {
//             boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
//           },
//         }}
//         className="pricing"
//       >
//         <CardContent>
//           <form>
//             <div className="form-center">
//               <h4 className="type">For Schools 🏫</h4>
//             </div>
//           </form>
//           <div className="bodyText">
//             <h5>Features</h5>
//             <p>
//               ✅ Unlock the power of AI in the classroom.
//               <br />
//               ✅ Access to 8 powerful tools.
//               <br />✅ Unlimited Usage
//             </p>
//             <Button
//               sx={{
//                 width: '100%',
//                 maxWidth: '100%',
//               }}
//               variant="contained"
//               href="https://educationcopilot.com/contact"
//               target="_blank"
//             >
//               Contact us
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </Wrapper>
//   );
// };
// export default PricingPage;
