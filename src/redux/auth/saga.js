// @flow
import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';


import { ApiCall } from '../../services/index';
import { endpoints } from '../../services/endpoints';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER,  } from './constants';

import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,

} from './actions';

/**
 * Sets the session
 * @param {*} user
 */
 const setSession = user => {
    if (user) {
        let cookies = new Cookies();
        cookies.set('user', JSON.stringify(user), { path: '/' });
    } else {
        let cookies = new Cookies();
        cookies.remove('user', { path: '/' });
    }

};
/**
 * Login the user
 * @param {*} payload - username and password
 */
 function* login({ payload: { username, password } }) {
   
    let sendData = {};
    sendData.email = username;
    sendData.password = password;

    const options = {
        headers: {
            'Content-Type': 'application/json',
           
        },
        method: 'POST',
        url: endpoints.loginUrl,
        data: sendData
    };

    try {
        const response = yield call(ApiCall, options); 
        
       
        if (response.data.status === 'success')   {  
            setSession(response.data.data);   
            yield put(loginUserSuccess(response.data));
            console.log(response,"1");
        } else if(response.data.status === 'error') {
            yield put(loginUserFailed(response.data.message));
            console.log(response,"2");
        }

        else {
            console.log(response,"3");
            yield put(loginUserFailed("Invalid Credentials."));   

        }
    } catch (error) {   

        let message;
         
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}

/**
 * Logout the user
 * @param {*} param0
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push('/account/login');
        });
    } catch (error) {}
}

/**
 * Register the user
 */
function* register({ payload:data }) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: endpoints.registerUrl,
        data: data
    };

    try {
        const response = yield call(ApiCall, options);

       
            yield put(registerUserSuccess(response));

      
   
    } catch (error) {
        let message;
        switch (error.status) {
            case 500:
                message = 'Internal Server Error';
                break;
            case 401:
                message = 'Invalid credentials';
                break;
            default:
                message = error;
        }
        yield put(registerUserFailed(message));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser(): any {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser(): any {
    yield takeEvery(REGISTER_USER, register);
}



function* authSaga(): any {
    yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchRegisterUser)]);
}

export default authSaga;
