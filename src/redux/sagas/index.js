import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import applicationsSaga from './applicationsSaga';
import contactsSaga from './contactsSaga';
import notificationsSaga from './notificationsSaga';
import goalsSaga from './goalsSaga';
import documentsSaga from './documentsSaga';
import eventsSaga from './eventsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    applicationsSaga(),
    contactsSaga(),
    notificationsSaga(),
    goalsSaga(),
    documentsSaga(),
    eventsSaga(),
  ]);
}
