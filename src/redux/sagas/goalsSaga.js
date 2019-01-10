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

function* updateGoal(action) {
  try {
    yield axios.put(`api/user/goal/${action.payload.user_id}`, action.payload )
    yield put({ type: 'FETCH_USER' })
  } catch (error) {
    console.log('Error updating goal: ', error);
  }
}

function* registrationSaga() {
  yield takeEvery('RESET_GOALS', resetGoals)
  yield takeEvery('UPDATE_GOAL', updateGoal)
}

export default registrationSaga
