import { select, takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

const getApplications = (state) => state.applications

function* fetchNotifications() {
  try {
    let applications = yield select(getApplications);
    yield put({ type: 'SET_NOTIFICATIONS', payload: applications });
  } catch (error) {
  }
}

function* dismissNotification(action) {
  try {
    yield axios.put(`api/applications/notification/${action.payload.id}`, action.payload)
    yield put({ type: 'FETCH_APPLICATIONS' });
  } catch (error) {
  }
}
function* registrationSaga() {
  yield takeEvery('FETCH_NOTIFICATIONS', fetchNotifications)
  yield takeEvery('DISMISS_NOTIFICATION', dismissNotification)
}

export default registrationSaga
