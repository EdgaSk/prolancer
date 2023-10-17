import { createContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(false);
  const [userId, setUserId] = useLocalStorage(null);

  const updateUser = (id) => {
    setUserId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };
  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        updateUser,
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
