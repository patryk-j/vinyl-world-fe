import { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return isAuthenticated() ? <Route {...rest} element={<Element />} /> : null;
};

export default PrivateRoute;
