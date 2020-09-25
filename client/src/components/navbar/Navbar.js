import React, { useContext } from "react";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import BrandLogo from "./BrandLogo.jpg";
import { UserContext } from "../../App";
import { AiFillPlusCircle } from "react-icons/ai";

const Navbar = () => {
  const history = useHistory();
  const handleClick = (event) => {
    document.body.classList.toggle("nav-toggle-links");
  };
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <div>
          <Link className="nav-link" to="/profile" onClick={handleClick}>
            Profile
          </Link>
        </div>,
        <div>
          <Link className="nav-link" to="/" onClick={handleClick}>
            Home
          </Link>
        </div>,
        <div>
          <Link className="nav-link" to="/createPost" onClick={handleClick}>
            <AiFillPlusCircle />
          </Link>
        </div>,
        <div className="signout-button">
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              handleClick();
              history.push("/signin");
            }}
          >
            Signout
          </button>
        </div>,
      ];
    } else {
      return [
        <div>
          <Link className="nav-link" to="/signin" onClick={handleClick}>
            Signin
          </Link>
        </div>,
      ];
    }
  };
  return (
    <div>
      <div className="nav-addon">
        <img src={BrandLogo} alt="Brand logo" />
        <h1>Bakar</h1>
      </div>
      <div className="navbar-container">
        <div className="brand-name">
          <img src="" alt="" />
          <div className="name">Bakar</div>
        </div>
        <FaBars className="fabars" onClick={handleClick} size={"30px"} />
      </div>
      <div className="nav-links" id="nav-links-id">
        <div className="links">{renderList()}</div>
      </div>
    </div>
  );
};
export default Navbar;
