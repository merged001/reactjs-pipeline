import { all } from 'redux-saga/effects';
import rootSagas from './sagas';

export default function* rootSaga() {
  yield all([...rootSagas]);
}
