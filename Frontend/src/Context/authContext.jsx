import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { getUser, signUp, signIn, logOut } from "../Services/UsersService";

const authContext = createContext(null);
authContext.displayName = "auth-context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    refreshAndRedirect();
  }, []);

  const refreshAndRedirect = () => {
    return setUser(getUser());
  };

  const createUser = async (userData) => {
    const response = await signUp(userData);
    refreshAndRedirect();
    return response;
  };

  const userSignIn = async (userData) => {
    const response = await signIn(userData);
    refreshAndRedirect();
    return response;
  };

  const userLogOut = () => {
    logOut();
    refreshAndRedirect();
  };

  return (
    <authContext.Provider value={{ createUser, userSignIn, userLogOut, user }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export default AuthProvider;
