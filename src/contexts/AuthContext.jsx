import { createContext, useContext, useState } from "react";
import { URLS } from "../../constants";

const initialState = JSON.parse(localStorage.getItem("user")) || null;

export const AuthContext = createContext(initialState);

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(initialState)

  function login(user) {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      { children }
    </AuthContext.Provider>
  )
}
