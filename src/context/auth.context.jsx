import { createContext, useContext, useState } from "react";
import useRecipeByIngredient from "../hooks/useRecipeByIngredient";
import { getAllFavorites, saveFavorite } from "../services/favServices";
import userService, {
  conectUser,
  getUserDetails,
  logOutUser,
} from "../services/userService";

const authContext = createContext(null);
authContext.displayName = "auth-context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserDetails());

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
