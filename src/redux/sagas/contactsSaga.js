import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* addContact(action) {
  try {
    yield axios.post('api/contacts', action.payload)
    yield put({ type: 'ADD_CONTACT_SNACK' })
    yield put({ type: 'FETCH_CONTACTS' })
  } catch (error) {
    console.log('Error POSTING contact:', error)
  }
}

function* fetchContacts() {
  try {
    const response = yield axios.get('api/contacts')
    yield put({ type: 'SET_CONTACTS', payload: response.data })
  } catch (error) {
    console.log('Error GETTING contacts:', error)
  }
}

function* editContact(action) {
  try {
    yield axios.put(`api/contacts/${action.payload.contact_id}`, action.payload)
    yield put({ type: 'EDIT_CONTACT_SNACK' })
    yield put({ type: 'FETCH_CONTACTS' })
  } catch (error) {
    console.log('Error PUTTING Contact:', error)
  }
}

function* deleteContact(action) {
  try {
    yield axios.delete(`api/contacts/${action.payload}`)
    yield put({ type: 'DELETE_CONTACT_SNACK' })
    yield put({ type: 'FETCH_CONTACTS' })
  } catch (error) {
    console.log('Error DELETING Contact:', error)
  }
}
function* registrationSaga() {
  yield takeEvery('ADD_CONTACT', addContact)
  yield takeEvery('FETCH_CONTACTS', fetchContacts)
  yield takeEvery('EDIT_CONTACT', editContact)
  yield takeEvery('DELETE_CONTACT', deleteContact)
}

export default registrationSaga
