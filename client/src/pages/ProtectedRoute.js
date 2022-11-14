import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const ProtectedRoute = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const { user } = useAppContext();

  if (!auth.currentUser) {
    return <Navigate to="/sign-in" />;
  }
  console.log(auth);
  return children;
};

export default ProtectedRoute;
