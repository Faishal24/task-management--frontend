import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      console.log("atas");
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.data;
      if (res && res.success) {
        const userData = res.data;
        setUser(userData.user);
        setToken(userData.token);
        localStorage.setItem("site", userData.token);
        navigate("/");
        return;
      }
    } catch (err) {
      setMsg(err.response.data);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/");
  };

  const message = () => {
    console.log(msg);
    if(msg.success == false) {
      document.querySelector(".alert").classList.add("show");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
