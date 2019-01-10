import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* resetGoals(action) {
  try {
    yield axios.put(`api/user/goals/${action.payload.user_id}`, {start_of_week: action.payload.start_of_week})
    yield put({ type: 'FETCH_USER' })
  } catch (error) {
    console.log('Error resetting goals: ', error);
  }
}

function* registrationSaga() {
  yield takeEvery('RESET_GOALS', resetGoals)
}

export default registrationSaga
