// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PRESCRIPTION_LIST, PRESCRIPTION_ADD, PRESCRIPTION_UPDATE, PRESCRIPTION_DELETE } from './constants';

import {
    getPrescriptionListSuccess,
    getPrescriptionListFailed,
    getPrescriptionAddSuccess,
    getPrescriptionAddFailed,
    getPrescriptionUpdateSuccess,
    getPrescriptionUpdateFailed,
    getPrescriptionDeleteSuccess,
    getPrescriptionDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const prescriptionAddedSucsess = () => toast.success('Prescription Added Successfully', { transition: Zoom });
const prescriptionDeletedSuccess = () => toast.success('Prescription Deleted Successfully', { transition: Zoom });
const prescriptionUpdated = () => toast.info('Prescription Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* PrescriptionList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization:  user.token,
        },
        method: 'POST',
        url: endpoints.prescriptionList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);
        yield put(getPrescriptionListSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getPrescriptionListFailed(message));
    }
}

// Prescription Add

function* PrescriptionAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        method: 'POST',
        url: endpoints.prescriptionAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
       if(response.data.code === 422){
        WarnFields(response.data.errors.message);
       } else{
        prescriptionAddedSucsess();
        yield put(getPrescriptionAddSuccess(response.data));
       }
   
       
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getPrescriptionAddFailed(message));
    }
}

// Prescription Update

function* PrescriptionUpdate({ payload: data }) {
    const user = getLoggedInUser();
let id = data.id
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        method: 'POST',
        url: endpoints.prescriptionUpdate + '/' + (id),
        data: data,
    };

    try {

        const response = yield call(ApiCall, options);       
        if(response.data.code === 422){
            WarnFields(response.data.errors.message);
           } else{
            yield put(getPrescriptionUpdateSuccess(response.data));
            prescriptionUpdated();
           }
  
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getPrescriptionUpdateFailed(message));
    }
}

// Prescription Delete

function* PrescriptionDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        method: 'DELETE',
        url: endpoints.prescriptionDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        prescriptionDeletedSuccess();
        yield put(getPrescriptionDeleteSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.response.status) {
            case 500:
                message = 'Internal Server Error';
                WarnFields(message);
                break;
            case 401:
                message = 'Invalid credentials';
                WarnFields(message);
                break;
            case 400:
                message = error.response.data && error.response.data.error;
                WarnFields(message);
                break;
            default:
                message = error;
        }
        yield put(getPrescriptionDeleteFailed(message));
    }
}

export function* watchPrescriptionList(): any {
    yield takeEvery(PRESCRIPTION_LIST, PrescriptionList);
}
export function* watchPrescriptionAdd(): any {
    yield takeEvery(PRESCRIPTION_ADD, PrescriptionAdd);
}
export function* watchPrescriptionUpdate(): any {
    yield takeEvery(PRESCRIPTION_UPDATE, PrescriptionUpdate);
}
export function* watchPrescriptionDelete(): any {
    yield takeEvery(PRESCRIPTION_DELETE, PrescriptionDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchPrescriptionList),
        fork(watchPrescriptionAdd),
        fork(watchPrescriptionUpdate),
        fork(watchPrescriptionDelete),
    ]);
}

export default authSaga;
