import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { useEffect } from "react";

const Navbar = (props) => {
  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    // eslint-disable-next-line no-undef
    M.Sidenav.init(elems);
  });
  const { auth, profile } = props;
  const links = !auth.isEmpty ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Projekt Plan
        </Link>
        {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        }
        {auth.isLoaded && links}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
