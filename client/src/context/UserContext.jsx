import { createContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import useCookiesStorage from "../hooks/useCookiesStorage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(false);
  const [userData, setUserData] = useLocalStorage({
    userId: null,
    roles: null,
  });
  const [accessToken, setAccessToken] = useCookiesStorage("accessToken");
  const [refreshToken, setRefreshToken] = useCookiesStorage("refreshToken");

  const updateUser = (id) => {
    setUserData((prevData) => ({ ...prevData, userId: id }));
  };

  const updateUserRoles = (roles) => {
    setUserData((prevData) => ({ ...prevData, roles }));
  };

  const updateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  const updateRefreshToken = (newRefreshToken) => {
    setRefreshToken(newRefreshToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({ userId: null, roles: null });
    setAccessToken(null); // Ištriname accessToken
    setRefreshToken(null); // Ištriname refreshToken
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
        accessToken,
        refreshToken,
        updateUser,
        updateUserRoles,
        updateAccessToken,
        updateRefreshToken,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export { UserContext, UserProvider };
