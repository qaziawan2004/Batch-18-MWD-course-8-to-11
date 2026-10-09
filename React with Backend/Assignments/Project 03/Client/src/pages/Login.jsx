import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/authContext.jsx";

import PasswordInput from "../components/PasswordInput.jsx";


const Login = () => {

  const navigate =
    useNavigate();


  const {
    login,
    loading
  } = useAuth();


  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });


  const [error, setError] =
    useState("");


  const handleChange = (
    e
  ) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");


      const result =
        await login(
          form.email,
          form.password
        );


      if (result.success) {

        navigate(
          "/dashboard"
        );

      } else {

        setError(
          result.message
        );

      }

    };


  return (

    <div className="auth-page">

      <form
        className="auth-form"
        onSubmit={
          handleSubmit
        }
      >

        <h1>
          Welcome Back
        </h1>


        <p className="auth-subtitle">
          Login to your Todo account
        </p>


        {error && (

          <div className="error">
            {error}
          </div>

        )}


        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={
            handleChange
          }
          required
        />


        <PasswordInput
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={
            handleChange
          }
        />


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>


        <p>

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>

  );
};


export default Login;
