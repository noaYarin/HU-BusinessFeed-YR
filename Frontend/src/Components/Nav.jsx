import "../Assests/Styles/Nav.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoThreeBars } from "react-icons/go";
import NavItem from "./NavItem";
import Button from "./Button";

function Nav() {
  const navLink = ({ isActive }) =>
    isActive ? "font-bold border-b-2 border-gray-600" : "font-thin";

  const [toggleNav, handleToggleNav] = useState(false);

  const closeNav = () => handleToggleNav(!toggleNav);
  const closeLink = () => handleToggleNav(false);

  return (
    <nav className="p-6">
      <button className="hidden xs:block" onClick={closeNav}>
        <GoThreeBars size={35} />
      </button>
      <ul className={`xs:hidden flex  ${toggleNav ? "isOpen" : null}`}>
        <NavItem
          itemClass="m-2"
          to="/"
          onClick={closeLink}
          className={navLink}
          text="Home"
        />
        <NavItem
          itemClass="m-2"
          to="userProfile"
          onClick={closeLink}
          className={navLink}
          text="User Profile"
        />
        <li className="m-1">
          <Link to="/signIn" onClick={closeLink}>
            <Button buttonStyle="bg-cream p-1 rounded-md" text="Sign In" />
          </Link>
        </li>
        <li className="m-1 h-8 border-l-2"></li>
        <li className="m-1">
          <Link to="/signUp" onClick={closeLink}>
            <Button buttonStyle="bg-cream p-1 rounded-md" text="Sign Up" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
