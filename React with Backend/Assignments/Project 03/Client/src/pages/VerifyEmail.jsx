import {
  useState
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams
} from "react-router-dom";

import {
  useAuth
} from "../context/authContext.jsx";


const VerifyEmail = () => {

  const navigate =
    useNavigate();


  const [
    searchParams
  ] = useSearchParams();


  const email =
    searchParams.get(
      "email"
    );


  const {
    verifyEmail,
    resendCode,
    loading
  } = useAuth();


  const [code, setCode] =
    useState("");


  const [error, setError] =
    useState("");


  const [message, setMessage] =
    useState("");


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setMessage("");


      if (
        code.length !== 6
      ) {

        setError(
          "Please enter the 6-digit code"
        );

        return;
      }


      const result =
        await verifyEmail(
          email,
          code
        );


      if (result.success) {

        navigate("/dashboard");

      } else {

        setError(
          result.message
        );

      }

    };


  const handleResend =
    async () => {

      setError("");

      setMessage("");


      const result =
        await resendCode(
          email
        );


      if (result.success) {

        setMessage(
          result.message
        );

      } else {

        setError(
          result.message
        );

      }

    };


  if (!email) {

    return (

      <div className="auth-page">

        <div className="auth-form">

          <h1>
            Invalid Verification
          </h1>

          <p>
            No email address was provided.
          </p>

          <Link to="/register">
            Back to Register
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="auth-page">

      <form
        className="auth-form"
        onSubmit={
          handleSubmit
        }
      >

        <h1>
          Verify Your Email
        </h1>


        <p className="auth-subtitle">

          We sent a 6-digit verification
          code to:

        </p>


        <strong>
          {email}
        </strong>


        {error && (

          <div className="error">
            {error}
          </div>

        )}


        {message && (

          <div className="success">
            {message}
          </div>

        )}


        <input
          type="text"
          inputMode="numeric"
          maxLength="6"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) =>
            setCode(
              e.target.value
                .replace(/\D/g, "")
            )
          }
          required
        />


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Verifying..."
            : "Verify Email"}

        </button>


        <button
          type="button"
          className="secondary-button"
          onClick={
            handleResend
          }
        >
          Resend Code
        </button>


        <Link to="/login">
          Back to Login
        </Link>

      </form>

    </div>

  );
};


export default VerifyEmail;
