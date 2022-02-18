import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Log In</NavLink>
        </li>
      </ul>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Log In</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
