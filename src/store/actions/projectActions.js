export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const { firstName, lastName } = getState().firebase.profile;
    const { uid: authorId } = getState().firebase.auth;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: firstName,
        authorLastName: lastName,
        authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch((error) => {
        dispatch({ type: "CREATE_PROJECT_ERROR", error });
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PROJECT" });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_PROJECT_ERROR", error });
      });
  };
};

export const editProject = (id, project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(id)
      .update(project)
      .then(() => {
        dispatch({ type: "UPDATE_PROJECT" });
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_PROJECT_ERROR", error });
      });
  };
};
