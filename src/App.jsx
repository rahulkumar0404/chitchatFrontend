import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LayoutLoader } from './components/layouts/Loaders.jsx';
import ProtectRoute from './components/auth/ProtectRoute.jsx';
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Chat = lazy(() => import('./pages/Chat.jsx'));
const Groups = lazy(() => import('./pages/Groups.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
let user = true;
const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div>
            <LayoutLoader />
          </div>
        }
      >
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
