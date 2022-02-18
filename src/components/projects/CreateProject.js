import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { notify } from "../../store/actions/notificationActions";
import { createProject } from "../../store/actions/projectActions";
import withNavigate from "../../utils/withNavigate";

class CreateProject extends Component {
  state = {
    title: "",
    content: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    const { profile } = this.props;
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.notify({
      content: "Created Project",
      name: `${profile.firstName} ${profile.lastName}`,
    });
    this.props.history("/");
  };

  render() {
    const { auth } = this.props;
    return !auth.uid ? (
      <Navigate to="/signin" />
    ) : (
      auth.isLoaded && (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white z-depth-1">
            <h5 className="grey-text text-darken-3">Create New Project</h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="content">Project Content</label>
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Create</button>
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
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    notify: (data) => dispatch(notify(data)),
  };
};

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(CreateProject)
);
