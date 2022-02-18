import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import withParams from "../../utils/withParams";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { Component } from "react";
import { deleteProject } from "../../store/actions/projectActions";
import withNavigate from "../../utils/withNavigate";
import { notify } from "../../store/actions/notificationActions";

class ProjectDetails extends Component {
  handleDelete = () => {
    const { id } = this.props.params;
    const { profile } = this.props;
    this.props.deleteProject(id);
    this.props.notify({
      content: "Deleted project",
      name: `${profile.firstName} ${profile.lastName}`,
    });
    this.props.history("/");
  };
  handleEditLink = () => {
    const { id } = this.props.params;
    const { project } = this.props;
    this.props.history(`/edit/${id}`, { state: project });
  };
  render() {
    const { project, auth } = this.props;
    if (!auth.uid) return <Navigate to="/signin" />;
    return project ? (
      <div>
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div className="row">
                <div className="col xl6 l6 m6 s6">
                  <div>
                    Posted by {project.authorFirstName} {project.authorLastName}
                  </div>
                  <div>{moment(project.createdAt.toDate()).calendar()}</div>
                </div>
                <div className="col xl6 l6 m6 s6">
                  <div className="right">
                    {auth.uid === project.authorId ? (
                      <div>
                        {
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a
                            onClick={this.handleEditLink}
                            className="btn waves-effect waves-light"
                          >
                            <i className="material-icons">edit</i>
                          </a>
                        }
                        <button
                          className="btn waves-effect waves-light red"
                          onClick={this.handleDelete}
                        >
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container center loading">
        <span>Loading project details...</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.params;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
    notify: (data) => dispatch(notify(data)),
  };
};

export default compose(
  withParams,
  withNavigate,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
