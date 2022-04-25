import { createContext, useState } from "react";

const AuthContext = createContext({});
// context 裡面會有多個Provider?
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
