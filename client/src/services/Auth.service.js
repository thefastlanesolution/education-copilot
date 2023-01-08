import { db } from '../firebase.config';
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
import { getAuth } from 'firebase/auth';

class AuthService {
  static async doesUserHaveActiveSubscription(optionalType = null) {
    const currentUser = await getAuth().currentUser;
    console.log(currentUser);
    const userId = await getAuth().currentUser.uid;
    const subscriptionsRef = collection(db, `users/${userId}/subscriptions`);

    const querySnapshot = await getDocs(subscriptionsRef);
    let hasActiveSubscriptions = false;
    querySnapshot.forEach(doc => {
      const subscriptionData = doc.data();
      console.log(subscriptionData);
      if (
        subscriptionData.status === 'active' ||
        subscriptionData.status === 'trialing'
      ) {
        if (optionalType) {
          if (subscriptionData.items[0].plan.interval === optionalType) {
            console.log(
              'User has active subscription for type: ',
              optionalType
            );
            hasActiveSubscriptions = true;
          }
        } else {
          hasActiveSubscriptions = true;
        }
      }
    });

    const isSubscribedToMainProduct =
      await AuthService.isUserSubscribedToMainProduct();
    return hasActiveSubscriptions && isSubscribedToMainProduct;
  }

  static async isUserSubscribedToMainProduct() {
    await getAuth().currentUser.getIdToken(true);
    const decodedToken = await getAuth().currentUser.getIdTokenResult();
    console.log('Claims:', decodedToken.claims);
    return decodedToken.claims.stripeRole === 'premium_1';
  }

  static async doesUserHaveMonthlySubscription() {
    return AuthService.doesUserHaveActiveSubscription('month');
  }

  static async doesUserHaveYearlySubscription() {
    return AuthService.doesUserHaveActiveSubscription('year');
  }

  static async getUserSubscriptionDetails() {
    const currentUser = await getAuth().currentUser;
    console.log(currentUser);
    const userId = await getAuth().currentUser.uid;
    const subscriptionsRef = collection(db, `users/${userId}/subscriptions`);

    const querySnapshot = await getDocs(subscriptionsRef);
    let finalSubscriptionData = undefined;
    querySnapshot.forEach(doc => {
      const subscriptionData = doc.data();
      console.log(subscriptionData);
      if (
        subscriptionData.status === 'active' ||
        subscriptionData.status === 'trialing'
      ) {
        finalSubscriptionData = subscriptionData;
      }
    });

    return finalSubscriptionData;
  }

  static async doesUserHaveAnnualSubscription() {
    await getAuth().currentUser.getIdToken(true);
    const decodedToken = await getAuth().currentUser.getIdTokenResult();
    console.log('Claims:', decodedToken.claims);
    return decodedToken.claims.stripeRole === 'premium_1';
  }
}

export default AuthService;
