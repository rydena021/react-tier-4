const snackbarReducer = (state = { open: false, message: '' }, action) => {
  switch (action.type) {
    case 'ADD_APPLICATION_SNACK':
      return { open: true, message: 'Application Added' };
    case 'EDIT_APPLICATION_SNACK':
      return { open: true, message: 'Application Updated' };
    case 'DELETE_APPLICATION_SNACK':
      return { open: true, message: 'Application Deleted' };
    case 'ADD_CONTACT_SNACK':
      return { open: true, message: 'Contact Added' };
    case 'EDIT_CONTACT_SNACK':
      return { open: true, message: 'Contact Updated' };
    case 'DELETE_CONTACT_SNACK':
      return { open: true, message: 'Contact Deleted' };
    case 'EDIT_USER_SNACK':
      return { open: true, message: 'Profile Updated' };
    case 'ADD_DOCUMENT_SNACK':
      return { open: true, message: 'Document Added' };
    case 'ADD_EVENT_SNACK':
      return { open: true, message: 'Event Added' };
    case 'HIDE_SNACK':
      return { open: false, message: '' };
    default:
      return state;
  }
}

export default snackbarReducer;
