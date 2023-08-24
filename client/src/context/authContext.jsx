import { useEffect, useState, createContext } from 'react';
import axios from 'axios'

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=> {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    const response = await axios.post("http://localhost:8080/auth/login", inputs, {withCredentials: true});
    setCurrentUser(response.data);
  }
  const logout = async (inputs) => {
    await axios.post("http://localhost:8080/auth/logout", {}, {withCredentials: true});
    setCurrentUser(null);
  }
  console.log(currentUser);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
