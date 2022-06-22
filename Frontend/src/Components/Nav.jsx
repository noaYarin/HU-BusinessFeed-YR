import { NavLink } from "react-router-dom";
function Nav() {
  const navLink = ({ isActive }) => (isActive ? "font-bold" : "font-thin");

  return (
    <nav>
      <ul className="flex justify-evenly">
        <li className="ml-4">
          <NavLink to="/" className={navLink}>
            Home
          </NavLink>
        </li>
        {/* <li className="ml-4">
          <NavLink to="authentication" className={navLink}>
            Authentication
          </NavLink>
        </li> */}
        <li className="ml-4">
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
      </ul>
    </nav>
  );
}

export default Nav;
