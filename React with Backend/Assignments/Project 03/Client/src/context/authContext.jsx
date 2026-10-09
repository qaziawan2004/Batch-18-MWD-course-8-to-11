import {
  createContext,
  useContext,
  useState
} from "react";

import api from "../services/api.js";


const AuthContext =
  createContext(null);


export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(() => {

      const savedUser =
        localStorage.getItem(
          "user"
        );


      return savedUser
        ? JSON.parse(savedUser)
        : null;

    });


  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (
    name,
    email,
    password
  ) => {

    setLoading(true);


    try {

      const response =
        await api.post(
          "/auth/register",
          {
            name,
            email,
            password
          }
        );


      return {
        success: true,

        email:
          response.data.email,

        message:
          response.data.message
      };

    } catch (error) {

      return {
        success: false,

        message:
          error.response?.data?.message ||
          "Registration failed"
      };

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // VERIFY EMAIL
  // ==========================================

  const verifyEmail = async (
    email,
    code
  ) => {

    setLoading(true);


    try {

      const response =
        await api.post(
          "/auth/verify-email",
          {
            email,
            code
          }
        );


      const {
        token,
        user
      } = response.data;


      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      setUser(user);


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,

        message:
          error.response?.data?.message ||
          "Verification failed"
      };

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // RESEND CODE
  // ==========================================

  const resendCode = async (
    email
  ) => {

    try {

      const response =
        await api.post(
          "/auth/resend-code",
          {
            email
          }
        );


      return {
        success: true,

        message:
          response.data.message
      };

    } catch (error) {

      return {
        success: false,

        message:
          error.response?.data?.message ||
          "Could not resend code"
      };
    }
  };


  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    email,
    password
  ) => {

    setLoading(true);


    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );


      const {
        token,
        user
      } = response.data;


      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      setUser(user);


      return {
        success: true
      };

    } catch (error) {

      return {
        success: false,

        message:
          error.response?.data?.message ||
          "Login failed"
      };

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );


    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        verifyEmail,
        resendCode,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};


export const useAuth = () => {

  return useContext(
    AuthContext
  );

};
