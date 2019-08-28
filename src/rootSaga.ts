import { all, call, spawn } from 'redux-saga/effects';
import authEffect from '@model/auth/effect';
import homeEffect from '@model/home/effect';

export default function* rootSaga() {
  const sagas = [authEffect, homeEffect];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (err) {
            console.log(err);
          }
        }
      })
    )
  );
}
