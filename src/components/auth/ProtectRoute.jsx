import { Navigate, Outlet } from 'react-router';

const ProtectRoute = ({ children, user, redirect = '/login' }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectRoute;
