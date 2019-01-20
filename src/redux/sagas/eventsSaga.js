import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

function* addEvent(action) {
  try {
    yield axios.post('api/events', action.payload)
    yield put({ type: 'ADD_EVENT_SNACK' })
    yield put({ type: 'FETCH_EVENTS' })
  } catch (error) {
    console.log('Error POSTING event:', error)
  }
}

function* fetchEvents() {
  try {
    const response = yield axios.get('api/events')
    yield put({ type: 'SET_EVENTS', payload: response.data })
  } catch (error) {
    console.log('Error GETTING events:', error)
  }
}

function* registrationSaga() {
  yield takeEvery('ADD_EVENT', addEvent)
  yield takeEvery('FETCH_EVENTS', fetchEvents)
}

export default registrationSaga
