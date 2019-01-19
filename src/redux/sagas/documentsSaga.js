import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

function* addDocument(action) {
  try {
    yield axios.post('api/documents', action.payload)
    yield put({ type: 'ADD_DOCUMENT_SNACK' })
    yield put({ type: 'FETCH_DOCUMENTS' })
  } catch (error) {
    console.log('Error POSTING contact:', error)
  }
}

function* fetchDocuments() {
  try {
    const response = yield axios.get('api/documents')
    yield put({ type: 'SET_DOCUMENTS', payload: response.data })
  } catch (error) {
    console.log('Error GETTING documents:', error)
  }
}

function* registrationSaga() {
  yield takeEvery('ADD_DOCUMENT', addDocument)
  yield takeEvery('FETCH_DOCUMENTS', fetchDocuments)
}

export default registrationSaga
