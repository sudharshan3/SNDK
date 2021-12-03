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

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type CustomerAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Customer = (state: State = INIT_STATE, action: CustomerAction) => {
    switch (action.type) {
        case CUSTOMER_LIST:
            return { ...state, listloading: true };
        case CUSTOMER_LIST_SUCCESS:
            return { ...state, customer: action.payload, listloading: false, error: null };
        case CUSTOMER_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CUSTOMER_ADD:
            return { ...state, loading: true };
        case CUSTOMER_ADD_SUCCESS:
            return { ...state, customerAdd: action.payload, loading: false, error: null };
        case CUSTOMER_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CUSTOMER_UPDATE:
            return { ...state, loading: true };
        case CUSTOMER_UPDATE_SUCCESS:
            return { ...state, customerUpdate: action.payload, loading: false, error: null };
        case CUSTOMER_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CUSTOMER_DELETE:
            return { ...state, loading: true };
        case CUSTOMER_DELETE_SUCCESS:
            return { ...state, customerDelete: action.payload, loading: false, error: null };
        case CUSTOMER_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Customer;
