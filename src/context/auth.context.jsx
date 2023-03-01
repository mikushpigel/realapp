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

  const refresState = () => {
    setUser(getUserDetails());
  };

  const login = async (credential) => {
    const response = await conectUser(credential);
    refresState();
    console.log(response);
    return response;
  };
  const logout = () => {
    logOutUser();
    refresState();
  };

  return (
    <authContext.Provider
      value={{
        user,
        refresState,
        login,
        logout,
        createUser: userService.createUser,
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
