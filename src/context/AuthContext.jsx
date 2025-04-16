import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userSalvo = sessionStorage.getItem("user");
    if (userSalvo) {
      setUsuario(JSON.parse(userSalvo));
    }
  }, []);

  const login = (dadosUsuario) => {
    sessionStorage.setItem("user", JSON.stringify(dadosUsuario));
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
