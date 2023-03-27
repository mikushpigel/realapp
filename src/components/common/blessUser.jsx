import { useAuth } from "../../context/auth.context";

const BlessUser = () => {
  const { user } = useAuth();
  let today = new Date();
  let currentTime = today.getHours();

  if (user) {
    if (currentTime < 12) {
      return (
        <div className="bless-user-div">
          <h3>Good Morning {user.name} ❤</h3>
        </div>
      );
    } else if (currentTime < 18) {
      return (
        <div className="bless-user-div">
          <h3>Good Afternoon {user.name} ❤</h3>
        </div>
      );
    } else {
      return (
        <div className="bless-user-div">
          <h3>Good Evening {user.name} ❤</h3>
        </div>
      );
    }
  }
  return null;
};

export default BlessUser;
