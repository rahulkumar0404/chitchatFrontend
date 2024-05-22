import { Suspense, lazy, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import api from './api.js';
import ProtectRoute from './components/auth/ProtectRoute.jsx';
import { LayoutLoader } from './components/layouts/Loaders.jsx';
import { userExists, userNotExists } from './redux/reducers/auth.js';
import { SocketProvider } from './socket.jsx';
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Chat = lazy(() => import('./pages/Chat.jsx'));
const Groups = lazy(() => import('./pages/Groups.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const AdminUserManagement = lazy(() =>
  import('./pages/admin/UserManagement.jsx')
);
const AdminChatManagement = lazy(() =>
  import('./pages/admin/ChatManagement.jsx')
);
const AdminMessageManagement = lazy(() =>
  import('./pages/admin/MessageManagement.jsx')
);
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const App = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await api.getProfileUser();
        dispatch(userExists(data.user));
      } catch (error) {
        dispatch(userNotExists());
        toast.error(error.response.data.message || 'Profile User failed');
      }
    }
    fetchUser()
  }, [dispatch]);
  return (
    <Router>
      {isLoading ? (
        <LayoutLoader />
      ) : (
        <Suspense
          fallback={
            <div>
              <LayoutLoader />
            </div>
          }
        >
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <ProtectRoute user={user} />
                </SocketProvider>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/chat/:chatId" element={<Chat />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectRoute user={!user} redirect="/">
                  <Login />{' '}
                </ProtectRoute>
              }
            />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/groups" element={<AdminChatManagement />} />
            <Route
              path="/admin/messages"
              element={<AdminMessageManagement />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
