import { createContext, useContext, useState } from "react";
import userService, {
  conectUser,
  getUserDetails,
  logOutUser,
} from "../services/userService";

const authContext = createContext(null);
authContext.displayName = "auth-context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserDetails());
  const [favRecipes, setFavRecipes] = useState([]);

  const refreshUser = () => {
    setUser(getUserDetails());
  };

  const login = async (credential) => {
    await conectUser(credential);
    refreshUser();
  };
  const logout = () => {
    logOutUser();
    refreshUser();
  };

  const recoveryPassword = async (email) => {
    return await userService.recoverPassword(email);
  };

  return (
    <authContext.Provider
      value={{
        user,
        favRecipes,
        refreshUser,
        login,
        logout,
        createUser: userService.createUser,
        recoveryPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(authContext);
};
