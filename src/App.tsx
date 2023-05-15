import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./router/PrivateRoute/PrivateRoute";
import 'antd/dist/antd.min.css';
const Protected = lazy(() => import("./components/Protected"));
const Login = lazy(() => import("./pages/Authen/SignIn"));
function App() {
  return (
    <>
      <Router>
        <Routes>
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
            path="/auth/login"
            element={
              <Suspense fallback={<></>}>
                <Login />
              </Suspense>
            }
          />
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
