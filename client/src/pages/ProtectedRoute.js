import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
// import { useEffect, useState } from 'react';
// import AuthService from '../services/Auth.service';
// import { NavigateFallback } from '../components/Navigate';

const auth = getAuth();

const ProtectedRoute = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  // const [loadingUserStatus, setLoadingUserStatus] = useState(true);
  // const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const { user } = useAppContext();

  // useEffect(async () => {
  //   if (loggedIn && loadingUserStatus) {
  //     const result = await AuthService.doesUserHaveActiveSubscription();
  //     setIsUserSubscribed(result);
  //     setLoadingUserStatus(false);
  //   }
  // }, [loggedIn, checkingStatus]);

  // console.log(window.location.href);
  if (auth?.currentUser?.accessToken === null) {
    return <Navigate to="/sign-in" />;
  // } else if (!loadingUserStatus && !isUserSubscribed) {
  //   return <Navigate to="/pricing" />;
  }
  console.log('AUTH: ', auth);
  return children;
};

export default ProtectedRoute;
