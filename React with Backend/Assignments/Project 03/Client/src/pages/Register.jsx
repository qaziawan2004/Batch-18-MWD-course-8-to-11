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


const Register = () => {

  const navigate =
    useNavigate();


  const {
    register,
    loading
  } = useAuth();


  const [form, setForm] =
    useState({
      name: "",
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
        await register(
          form.name,
          form.email,
          form.password
        );


      if (result.success) {

        navigate(
          `/verify-email?email=${encodeURIComponent(
            result.email
          )}`
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
          Create Account
        </h1>


        <p className="auth-subtitle">
          Create your Todo account
        </p>


        {error && (

          <div className="error">
            {error}
          </div>

        )}


        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={
            handleChange
          }
          required
        />


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


        <small>
          Password must contain at least
          6 characters.
        </small>


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Creating account..."
            : "Register"}

        </button>


        <p>

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>

  );
};


export default Register;
