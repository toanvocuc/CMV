import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const KEYS = {
  token:    "vinacomin_token",
  username: "vinacomin_user",
  name:     "vinacomin_name",
  role:     "vinacomin_role",
};

export const AuthProvider = ({ children }) => {
  const [token,    setToken]    = useState(() => localStorage.getItem(KEYS.token));
  const [username, setUsername] = useState(() => localStorage.getItem(KEYS.username));
  const [name,     setName]     = useState(() => localStorage.getItem(KEYS.name));
  const [role,     setRole]     = useState(() => localStorage.getItem(KEYS.role));

  const login = (newToken, newUsername, newRole, newName) => {
    localStorage.setItem(KEYS.token,    newToken);
    localStorage.setItem(KEYS.username, newUsername);
    localStorage.setItem(KEYS.name,     newName ?? newUsername);
    localStorage.setItem(KEYS.role,     newRole);
    setToken(newToken);
    setUsername(newUsername);
    setName(newName ?? newUsername);
    setRole(newRole);
  };

  const logout = () => {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    setToken(null); setUsername(null); setName(null); setRole(null);
  };

  return (
    <AuthContext.Provider value={{
      token, username, name, role,
      login, logout,
      isAuth:   !!token,
      isAdmin:  role === "admin",
      isWriter: role === "writer",
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
