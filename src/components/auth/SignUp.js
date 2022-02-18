import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";
import { notify } from "../../store/actions/notificationActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const that = this.state;
    const { firstName, lastName } = that;
    this.props.signUp(this.state).then((res) => {
      if (res)
        this.props.notify({
          content: "Joined",
          name: `${firstName} ${lastName}`,
        });
    });
  };

  render() {
    const { auth, authError } = this.props;
    return auth.uid ? (
      <Navigate to="/" />
    ) : (
      auth.isLoaded && (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white z-depth-1">
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            </div>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
    notify: (data) => dispatch(notify(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
