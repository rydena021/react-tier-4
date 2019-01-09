import { select, put, takeEvery } from 'redux-saga/effects'

const getApplications = (state) => state.applications

function* fetchNotifications() {
  try {
    let applications = yield select(getApplications);

    console.log('fetching notis:', applications);

  } catch (error) {
    console.log('Error FETCHING notifications:', error)
  }
}

function* registrationSaga() {
  yield takeEvery('FETCH_NOTIFICATIONS', fetchNotifications)
}

export default registrationSaga
