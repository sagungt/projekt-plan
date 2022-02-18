import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Navigate } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    return !auth.uid ? (
      <Navigate to="/signin" replace={true} />
    ) : projects ? (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m8">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m4">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    ) : (
      <div className="container loading">Loading projects...</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", orderBy: ["time", "desc"], limit: 3 },
  ])
)(Dashboard);
