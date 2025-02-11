import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  useEffect(() => {
    if (authTokens) {
      axios.defaults.headers["Authorization"] = `Bearer ${authTokens.access}`;
    }
  }, [authTokens]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/blog/api/token/",
        { username, password }
      );
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setUser(username);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
