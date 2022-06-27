import { NavLink, Link } from "react-router-dom";
import Button from "./Button";
function Nav() {
  const navLink = ({ isActive }) =>
    isActive ? "font-bold border-b-2 border-gray-600" : "font-thin";

  return (
    <nav>
      <ul className="flex justify-evenly mt-3">
        <li className="ml-4">
          <NavLink to="/" className={navLink}>
            Home
          </NavLink>
        </li>
        <li className="ml-4 ">
          <NavLink to="about" className={navLink}>
            About
          </NavLink>
        </li>
        <li className="ml-4">
          <NavLink to="contactUs" className={navLink}>
            Contact Us
          </NavLink>
        </li>
        <li className="ml-4">
          <NavLink to="userProfile" className={navLink}>
            User Profile
          </NavLink>
        </li>
        <li className="ml-4">
          <Link to="/authentication">
            <Button buttonStyle="bg-cream p-1 mb-5" text="Sign In" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
