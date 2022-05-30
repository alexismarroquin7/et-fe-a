import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const PrivateRoute = (props) => {
  
  const auth = useSelector(s => s.auth);

  return auth.loggedIn
  ? (
    props.children
  ) : (
    <Navigate
      to="/login"
    />
  );
}