import { NavLink, Link } from "react-router-dom";
import Button from "./Button";
import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import "./CSS/Nav.css";

function Nav() {
  const navLink = ({ isActive }) =>
    isActive ? "font-bold border-b-2 border-gray-600" : "font-thin";

  const [toggleNav, handleToggleNav] = useState(false);

  const closeNav = () => handleToggleNav(!toggleNav);
  const closeLink = () => handleToggleNav(false);

  return (
    <nav>
      <button className="hidden xs:block" onClick={closeNav}>
        <GoThreeBars size={35} />
      </button>
      <ul className={`xs:hidden flex  ${toggleNav ? "isOpen" : null}`}>
        <li className="m-2">
          <NavLink to="/" className={navLink} onClick={closeLink}>
            Home
          </NavLink>
        </li>
        <li className="m-2">
          <NavLink to="about" className={navLink} onClick={closeLink}>
            About
          </NavLink>
        </li>
        <li className="m-2">
          <NavLink to="contactUs" className={navLink} onClick={closeLink}>
            Contact Us
          </NavLink>
        </li>
        <li className="m-2">
          <NavLink to="userProfile" className={navLink} onClick={closeLink}>
            User Profile
          </NavLink>
        </li>
        <li className="m-2">
          <Link to="/authentication" onClick={closeLink}>
            <Button buttonStyle="bg-cream p-1 mb-5 " text="Sign In" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
