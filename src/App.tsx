import 'antd/dist/antd.min.css';
import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './router/PrivateRoute/PrivateRoute';
const Protected = lazy(() => import('./components/Protected'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Authen/SignIn'));
const SignUp = lazy(() => import('./pages/Authen/SignUp'));
const ChangPassword = lazy(() => import('./pages/Authen/ChangePassword'));
const NavigationPage = lazy(() => import('./pages/Authen/navigationPage'));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            // path="/auth/home"
            element={
              <Suspense fallback={<></>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Suspense fallback={<></>}>
                  <Protected />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <Suspense fallback={<></>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/auth/navigation"
            element={
              <Suspense fallback={<></>}>
                <NavigationPage />
              </Suspense>
            }
          />
          <Route
            path="/auth/login"
            element={
              <Suspense fallback={<></>}>
                <Login />
              </Suspense>
            }
          />
          {/* <Route
            path="/change-password"
            element={
              <Suspense fallback={<></>}>
                <ChangPassword />
              </Suspense>
            }
          /> */}
          {/* <Route
            // path="/"
            path="/auth/home"
            element={
              <Suspense fallback={<></>}>
                <Home />
              </Suspense>
            }
          /> */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
