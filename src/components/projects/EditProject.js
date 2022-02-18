import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { notify } from "../../store/actions/notificationActions";
import { editProject } from "../../store/actions/projectActions";
import withLocation from "../../utils/withLocation";
import withNavigate from "../../utils/withNavigate";
import withParams from "../../utils/withParams";

class EditProject extends Component {
  constructor(props) {
    super(props);
    const { title, content } = this.props.location.state;
    this.state = {
      title: title,
      content: content,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    const { profile } = this.props;
    const { id } = this.props.params;
    e.preventDefault();
    this.props.editProject(id, this.state);
    this.props.notify({
      content: "Edited Project",
      name: `${profile.firstName} ${profile.lastName}`,
    });
    this.props.history("/");
  };

  render() {
    const { auth } = this.props;
    return !auth.uid && auth.isLoaded ? (
      <Navigate to="/signin" />
    ) : (
      auth.isLoaded && (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white z-depth-1">
            <h5 className="grey-text text-darken-3">Edit Project</h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                onChange={this.handleChange}
                value={this.state.title}
                autoFocus={true}
              />
            </div>
            <div className="input-field">
              <label htmlFor="content">Project Content</label>
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChange}
                value={this.state.content}
                autoFocus={true}
              ></textarea>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Edit</button>
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
    editProject: (id, project) => dispatch(editProject(id, project)),
    notify: (data) => dispatch(notify(data)),
  };
};

export default compose(
  withLocation,
  withNavigate,
  withParams,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(EditProject);
