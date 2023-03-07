import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import PageHeader from "./common/PageHeader";
import SignUpForm from "./common/SignUpForm";

const SignUpPremium = ({ redirect }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <SignUpForm
      type="Premium"
      isBiz={true}
      description={
        <>
          yammy recipe is more fun with premium account!
          <br /> now it's only{" "}
          <span style={{ fontWeight: "bolder", color: "purple" }}>
            29.90$
          </span>{" "}
          for whole year
        </>
      }
      redirect={"/my-favorites"}
    />
  );
};

export default SignUpPremium;
