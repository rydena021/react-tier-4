import { select, takeEvery } from 'redux-saga/effects'

const getApplications = (state) => state.applications

function* fetchNotifications() {
  try {
    let applications = yield select(getApplications);
    console.log('notifications fetched:', applications);
  } catch (error) {
  }
}

function* registrationSaga() {
  yield takeEvery('FETCH_NOTIFICATIONS', fetchNotifications)
}

export default registrationSaga
