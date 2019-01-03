import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addApplication(action) {
  try {
    yield axios.post('api/applications', action.payload);
    yield put({ type: 'FETCH_APPLICATIONS' });
  } catch (error) {
    console.log('Error POSTING application:', error);
  }
}

function* fetchApplications() {
  try {
    const response = yield axios.get('api/applications');
    yield put({ type: 'SET_APPLICATIONS', payload: response.data });
  } catch (error) {
    console.log('Error GETTING applications:', error);
  }
}

function* registrationSaga() {
  yield takeEvery('ADD_APPLICATION', addApplication);
  yield takeEvery('FETCH_APPLICATIONS', fetchApplications);
}

export default registrationSaga;
