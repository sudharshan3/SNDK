// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

} from './constants';

type AuthAction = { type: string, payload: {} | string };

export const loginUser = (username: string, password: string): AuthAction => ({
    type: LOGIN_USER,
    payload: { username, password },
});

export const loginUserSuccess = (user: string): AuthAction => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error: string): AuthAction => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const registerUser = (fullname: string, email: string, password: string): AuthAction => ({
    type: REGISTER_USER,
    payload: { fullname, email, password },
});

export const registerUserSuccess = (user: {}): AuthAction => ({
    type: REGISTER_USER_SUCCESS,
    payload: user,
});

export const registerUserFailed = (error: string): AuthAction => ({
    type: REGISTER_USER_FAILED,
    payload: error,
});

export const logoutUser = (history: any): AuthAction => ({
    type: LOGOUT_USER,
    payload: { history },
});

