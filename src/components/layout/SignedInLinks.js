import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/create">New Project</NavLink>
        </li>
        <li>
          {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a onClick={props.signOut}>Log Out</a>
          }
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            {props.profile.initials}
          </NavLink>
        </li>
      </ul>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <NavLink to="/" className="btn pink lighten-1">
            {props.profile.firstName} {props.profile.lastName}
          </NavLink>
        </li>
        <li>
          <NavLink to="/create">New Project</NavLink>
        </li>
        <li>
          {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a onClick={props.signOut}>Log Out</a>
          }
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
