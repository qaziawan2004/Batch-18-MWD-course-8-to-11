import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/authContext.jsx";


const Navbar = () => {

  const {
    user,
    logout
  } = useAuth();


  const navigate =
    useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  return (

    <nav className="navbar">

      <div>

        <h2>
          Todo App
        </h2>

      </div>


      <div className="navbar-right">

        <span>
          Hi, {user?.name}
        </span>


        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
};


export default Navbar;
