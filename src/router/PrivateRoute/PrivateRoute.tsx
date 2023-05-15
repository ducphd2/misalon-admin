import { Navigate } from "react-router-dom";
import { withCookies } from "react-cookie";

function PrivateRoute(props: any) {
  const { children } = props;
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return !!isLoggedIn ? children : <Navigate to="/auth/login" />;
}

export default withCookies(PrivateRoute);
