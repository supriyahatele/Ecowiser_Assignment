import { useContext } from "react";
import { Navigate } from "react-router-dom";
import  { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  console.log(auth)
  return auth.isLoggedIn && auth.token? children : <Navigate to={"/login"} />;
}

export { PrivateRoute };
