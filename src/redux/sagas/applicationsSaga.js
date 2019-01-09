import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addApplication(action) {
  try {
    yield axios.post('api/applications', action.payload)
    yield put({ type: 'FETCH_APPLICATIONS' })
  } catch (error) {
    console.log('Error POSTING application:', error)
  }
}

function* fetchApplications() {
  try {
    const response = yield axios.get('api/applications')
    yield put({ type: 'SET_APPLICATIONS', payload: response.data })
    yield put({ type: "FETCH_NOTIFICATIONS" })
  } catch (error) {
    console.log('Error GETTING applications:', error)
  }
}

function* editApplication(action) {
  try {
    yield axios.put(`api/applications/${action.payload.application_id}`, action.payload)
    yield put({ type: 'FETCH_APPLICATIONS' })
  } catch (error) {
    console.log('Error PUTTING application:', error)
  }
}

function* deleteApplication(action) {
  try {
    yield axios.delete(`api/applications/${action.payload.id}`)
    yield put({ type: 'FETCH_APPLICATIONS' })
  } catch (error) {
    console.log('Error DELETING application:', error)
  }
}

function* registrationSaga() {
  yield takeEvery('ADD_APPLICATION', addApplication)
  yield takeEvery('FETCH_APPLICATIONS', fetchApplications)
  yield takeEvery('EDIT_APPLICATION', editApplication)
  yield takeEvery('DELETE_APPLICATION', deleteApplication)
}

export default registrationSaga
