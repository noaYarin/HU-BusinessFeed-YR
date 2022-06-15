import { NavLink } from "react-router-dom";
function Nav() {
  return (
    <div className="nav">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="authentication">Authentication</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <NavLink to="userProfile">User Profile</NavLink>
          </li>
          <li>
            <NavLink to="contactUs">Contact Us</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
