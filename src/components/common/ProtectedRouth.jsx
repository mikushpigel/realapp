import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const ProtectedRoute = ({ children, forPremium = false }) => {
  const { user } = useAuth();

  if (!user || (forPremium && !user.biz)) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
