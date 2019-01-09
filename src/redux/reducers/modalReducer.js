const modalReducer = (state = { open: false, application: {} }, action) => {
  switch (action.type) {
    case 'OPEN_EDIT_APPLICATION':
      return { open: true, application: action.payload };
    case 'CLOSE_EDIT_APPLICATION':
      return { open: false, application: {} };
    default:
      return state;
  }
};

export default modalReducer;
