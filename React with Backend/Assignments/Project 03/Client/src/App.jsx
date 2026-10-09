import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login
  from "./pages/Login.jsx";

import Register
  from "./pages/Register.jsx";

import VerifyEmail
  from "./pages/VerifyEmail.jsx";

import Dashboard
  from "./pages/Dashboard.jsx";

import ProtectedRoute
  from "./components/protectedRoute.jsx";


const App = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        <Route
          path="/login"
          element={
            <Login />
          }
        />


        <Route
          path="/register"
          element={
            <Register />
          }
        />


        <Route
          path="/verify-email"
          element={
            <VerifyEmail />
          }
        />


        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }
        />


        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
};


export default App;
