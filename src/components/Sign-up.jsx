import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import SignUpForm from "./common/SignUpForm";

const SignUp = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <SignUpForm
      isBiz={false}
      redirect={"/sign-in"}
      description={"open a new account, it is free!"}
    />
  );
};

export default SignUp;
