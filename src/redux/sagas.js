// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import prescriptionSaga from './prescription/saga';
import customerSaga from './customer/saga';

export default function* rootSaga(getState: any): any {
    yield all([authSaga(), layoutSaga(), appMenuSaga(), prescriptionSaga(),customerSaga()]);
}
