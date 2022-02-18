export const notify = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("notifications")
      .add({
        ...data,
        time: new Date(),
      })
      .then(() => {
        dispatch({ type: "NOTIFICATION" });
      })
      .catch((error) => {
        dispatch({ type: "NOTIFICATION_ERROR", error });
      });
  };
};
