import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const ProtectedRoute = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const { user } = useAppContext();
  console.log('USER;', auth.currentUser);

  if (auth?.currentUser?.accessToken === null) {
    return <Navigate to="/sign-in" />;
  }
  console.log('AUTH: ', auth);
  return children;
};

export default ProtectedRoute;
