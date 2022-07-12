import { NavLink } from "react-router-dom";

function NavItem({ itemClass, path, text, ...rest }) {
  return (
    <li className={itemClass}>
      <NavLink to={path} {...rest}>
        {text}
      </NavLink>
    </li>
  );
}

export default NavItem;
