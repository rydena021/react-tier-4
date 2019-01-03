import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* addApplication(action) {
  try {
    // passes the application object from the payload to the server
    yield axios.post('api/applications', action.payload);
  } catch (error) {
    console.log('Error adding application:', error);
  }
}

function* registrationSaga() {
  yield takeEvery('ADD_APPLICATION', addApplication);
}

export default registrationSaga;
