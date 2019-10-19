import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import history from '~/services/history';
import { singInSuccess } from './actions';

export function* singIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuario nao e prestador');
    return;
  }

  yield put(singInSuccess(token, user));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);
