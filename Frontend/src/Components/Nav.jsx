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
    <nav>
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
          to="about"
          onClick={closeLink}
          className={navLink}
          text="About"
        />
        <NavItem
          itemClass="m-2"
          to="contactUs"
          onClick={closeLink}
          className={navLink}
          text="Contact Us"
        />
        <NavItem
          itemClass="m-2"
          to="userProfile"
          onClick={closeLink}
          className={navLink}
          text="User Profile"
        />
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
