const initState = {
  projects: [
    { id: 1, title: "hello world", content: "aaa" },
    { id: 2, title: "lorem ipsum", content: "aaa" },
    { id: 3, title: "john doe", content: "aaa" },
  ],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return state;

    case "CREATE_PROJECT_ERROR":
      return state;

    case "DELETE_PROJECT":
      return state;

    case "DELETE_PROJECT_ERROR":
      return state;

    case "UPDATE_PROJECT":
      return state;

    case "UPDATE_PROJECT_ERROR":
      return state;

    default:
      return state;
  }
};

export default projectReducer;
