// @flow
import {
    CUSTOMER_LIST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_FAILED,
    CUSTOMER_ADD,
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_ADD_FAILED,
    CUSTOMER_UPDATE,
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAILED,
    CUSTOMER_DELETE,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_DELETE_FAILED
} from './constants';

type CustomerAction = { type: string, payload: {} | string };

export const getCustomerList = (): CustomerAction => ({
    type: CUSTOMER_LIST,
    payload: {},
});

export const getCustomerListSuccess = (customer: string): CustomerAction => ({
    type: CUSTOMER_LIST_SUCCESS,
    payload: customer,
});

export const getCustomerListFailed = (error: string): CustomerAction => ({
    type: CUSTOMER_LIST_FAILED,
    payload: error,
});

export const getCustomerAdd = (data:{}): CustomerAction => ({
    type: CUSTOMER_ADD,
    payload: data,
});

export const getCustomerAddSuccess = (customerAdd: string): CustomerAction => ({
    type: CUSTOMER_ADD_SUCCESS,
    payload: customerAdd,
});

export const getCustomerAddFailed = (error: string): CustomerAction => ({
    type: CUSTOMER_ADD_FAILED,
    payload: error,
});

export const getCustomerUpdate = (data:{}): CustomerAction => ({
    type: CUSTOMER_UPDATE,
    payload: data,
});

export const getCustomerUpdateSuccess = (customerUpdate: string): CustomerAction => ({
    type: CUSTOMER_UPDATE_SUCCESS,
    payload: customerUpdate,
});

export const getCustomerUpdateFailed = (error: string): CustomerAction => ({
    type: CUSTOMER_UPDATE_FAILED,
    payload: error,
});

export const getCustomerDelete = (id): CustomerAction => ({
    type: CUSTOMER_DELETE,
    payload: id,
});

export const getCustomerDeleteSuccess = (customerDelete: string): CustomerAction => ({
    type: CUSTOMER_DELETE_SUCCESS,
    payload: customerDelete,
});

export const getCustomerDeleteFailed = (error: string): CustomerAction => ({
    type: CUSTOMER_DELETE_FAILED,
    payload: error,
});
