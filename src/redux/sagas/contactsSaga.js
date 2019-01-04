import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addContact(action) {
  try {
    yield axios.post('api/contacts', action.payload);
    yield put({ type: 'FETCH_CONTACTS' });
  } catch (error) {
    console.log('Error POSTING contact:', error);
  }
}

function* fetchContacts() {
  try {
    const response = yield axios.get('api/contacts');
    yield put({ type: 'SET_CONTACTS', payload: response.data });
  } catch (error) {
    console.log('Error GETTING contacts:', error);
  }
}

function* registrationSaga() {
  yield takeEvery('ADD_CONTACT', addContact);
  yield takeEvery('FETCH_CONTACTS', fetchContacts);
}

export default registrationSaga;
