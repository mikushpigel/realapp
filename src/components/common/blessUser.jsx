import { useAuth } from "../../context/auth.context";

const BlessUser = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="bless-user-div">
        <h1>hello {user.name}</h1>
      </div>
    );
  }
  return null;
};

export default BlessUser;
