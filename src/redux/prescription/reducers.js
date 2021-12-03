// @flow
import {
    PRESCRIPTION_LIST,
    PRESCRIPTION_LIST_SUCCESS,
    PRESCRIPTION_LIST_FAILED,
    PRESCRIPTION_ADD,
    PRESCRIPTION_ADD_SUCCESS,
    PRESCRIPTION_ADD_FAILED,
    PRESCRIPTION_UPDATE,
    PRESCRIPTION_UPDATE_SUCCESS,
    PRESCRIPTION_UPDATE_FAILED,
    PRESCRIPTION_DELETE,
    PRESCRIPTION_DELETE_SUCCESS,
    PRESCRIPTION_DELETE_FAILED
} from './constants';

import { getLoggedInUser } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
};

type PrescriptionAction = { type: string, payload: {} | string };
type State = { user?: {} | null, loading?: boolean, +value ?: boolean };

const Prescription = (state: State = INIT_STATE, action: PrescriptionAction) => {
    switch (action.type) {
        case PRESCRIPTION_LIST:
            return { ...state, listloading: true };
        case PRESCRIPTION_LIST_SUCCESS:
            return { ...state, prescription: action.payload, listloading: false, error: null };
        case PRESCRIPTION_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PRESCRIPTION_ADD:
            return { ...state, loading: true };
        case PRESCRIPTION_ADD_SUCCESS:
            return { ...state, prescriptionAdd: action.payload, loading: false, error: null };
        case PRESCRIPTION_ADD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PRESCRIPTION_UPDATE:
            return { ...state, loading: true };
        case PRESCRIPTION_UPDATE_SUCCESS:
            return { ...state, prescriptionUpdate: action.payload, loading: false, error: null };
        case PRESCRIPTION_UPDATE_FAILED:
            return { ...state, error: action.payload, loading: false };
        case PRESCRIPTION_DELETE:
            return { ...state, loading: true };
        case PRESCRIPTION_DELETE_SUCCESS:
            return { ...state, prescriptionDelete: action.payload, loading: false, error: null };
        case PRESCRIPTION_DELETE_FAILED:
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Prescription;
