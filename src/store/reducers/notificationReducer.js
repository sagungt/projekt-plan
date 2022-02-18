const initState = {
  notifications: [
    { id: 1, content: "John joined", name: "John Doe", time: Date.now() },
    { id: 2, content: "John joined", name: "John Doe", time: Date.now() },
    { id: 3, content: "John joined", name: "John Doe", time: Date.now() },
  ],
};

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return state;

    case "NOTIFICATION_ERROR":
      return state;

    default:
      return state;
  }
};

export default notificationReducer;
