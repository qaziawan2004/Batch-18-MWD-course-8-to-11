import {
  useState
} from "react";


const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
  name = "password"
}) => {

  const [showPassword, setShowPassword] =
    useState(false);


  return (

    <div className="password-wrapper">

      <input
        type={
          showPassword
            ? "text"
            : "password"
        }

        name={name}

        placeholder={
          placeholder
        }

        value={value}

        onChange={onChange}

        required
      />


      <button
        type="button"

        className="password-toggle"

        onClick={() =>
          setShowPassword(
            !showPassword
          )
        }
      >

        {showPassword
          ? "Hide"
          : "Show"}

      </button>

    </div>

  );
};


export default PasswordInput;
