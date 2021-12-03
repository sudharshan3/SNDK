// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';


import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CUSTOMER_LIST, CUSTOMER_ADD, CUSTOMER_UPDATE, CUSTOMER_DELETE } from './constants';

import {
    getCustomerListSuccess,
    getCustomerListFailed,
    getCustomerAddSuccess,
    getCustomerAddFailed,
    getCustomerUpdateSuccess,
    getCustomerUpdateFailed,
    getCustomerDeleteSuccess,
    getCustomerDeleteFailed,
} from './actions';

import { getLoggedInUser } from '../../helpers/authUtils';

const customerAddedSucsess = () => toast.success('Customer Added Successfully', { transition: Zoom });
const customerDeletedSuccess = () => toast.success('Customer Deleted Successfully', { transition: Zoom });
const customerUpdated = () => toast.info('Customer Updated Successfully', { transition: Zoom });
const emptyAllFields = () => toast.warning('Please Fill All Fields', { transition: Zoom });
const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* CustomerList() {
    const user = getLoggedInUser();
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization:  user.token,
        },
        method: 'GET',
        url: endpoints.customerList,
        // data: sendData
    };

    try {
        const response = yield call(ApiCall, options);
        yield put(getCustomerListSuccess(response.data));
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
        yield put(getCustomerListFailed(message));
    }
}

// Customer Add

function* CustomerAdd({ payload: data }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        method: 'POST',
        url: endpoints.customerAdd,
        data: data,
    };

    try {
        const response = yield call(ApiCall, options);
       if(response.data.code === 422){
        WarnFields(response.data.errors.message);
       } else{
        customerAddedSucsess();
        yield put(getCustomerAddSuccess(response.data));
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
        yield put(getCustomerAddFailed(message));
    }
}

// Customer Update

function* CustomerUpdate({ payload: data }) {
    const user = getLoggedInUser();
let id = data.id
    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        method: 'POST',
        url: endpoints.customerUpdate + '/' + (id),
        data: data,
    };

    try {

        const response = yield call(ApiCall, options);       
        if(response.data.code === 422){
            WarnFields(response.data.errors.message);
           } else{
            yield put(getCustomerUpdateSuccess(response.data));
            customerUpdated();
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
        yield put(getCustomerUpdateFailed(message));
    }
}

// Customer Delete

function* CustomerDelete({ payload: id }) {
    const user = getLoggedInUser();

    let options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        method: 'DELETE',
        url: endpoints.customerDelete + '/' + id,
    };

    try {
        const response = yield call(ApiCall, options);
        customerDeletedSuccess();
        yield put(getCustomerDeleteSuccess(response.data));
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
        yield put(getCustomerDeleteFailed(message));
    }
}

export function* watchCustomerList(): any {
    yield takeEvery(CUSTOMER_LIST, CustomerList);
}
export function* watchCustomerAdd(): any {
    yield takeEvery(CUSTOMER_ADD, CustomerAdd);
}
export function* watchCustomerUpdate(): any {
    yield takeEvery(CUSTOMER_UPDATE, CustomerUpdate);
}
export function* watchCustomerDelete(): any {
    yield takeEvery(CUSTOMER_DELETE, CustomerDelete);
}

function* authSaga(): any {
    yield all([
        fork(watchCustomerList),
        fork(watchCustomerAdd),
        fork(watchCustomerUpdate),
        fork(watchCustomerDelete),
    ]);
}

export default authSaga;
