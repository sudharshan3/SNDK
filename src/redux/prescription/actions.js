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

type PrescriptionAction = { type: string, payload: {} | string };

export const getPrescriptionList = (): PrescriptionAction => ({
    type: PRESCRIPTION_LIST,
    payload: {},
});

export const getPrescriptionListSuccess = (prescription: string): PrescriptionAction => ({
    type: PRESCRIPTION_LIST_SUCCESS,
    payload: prescription,
});

export const getPrescriptionListFailed = (error: string): PrescriptionAction => ({
    type: PRESCRIPTION_LIST_FAILED,
    payload: error,
});

export const getPrescriptionAdd = (data:{}): PrescriptionAction => ({
    type: PRESCRIPTION_ADD,
    payload: data,
});

export const getPrescriptionAddSuccess = (prescriptionAdd: string): PrescriptionAction => ({
    type: PRESCRIPTION_ADD_SUCCESS,
    payload: prescriptionAdd,
});

export const getPrescriptionAddFailed = (error: string): PrescriptionAction => ({
    type: PRESCRIPTION_ADD_FAILED,
    payload: error,
});

export const getPrescriptionUpdate = (data:{}): PrescriptionAction => ({
    type: PRESCRIPTION_UPDATE,
    payload: data,
});

export const getPrescriptionUpdateSuccess = (prescriptionUpdate: string): PrescriptionAction => ({
    type: PRESCRIPTION_UPDATE_SUCCESS,
    payload: prescriptionUpdate,
});

export const getPrescriptionUpdateFailed = (error: string): PrescriptionAction => ({
    type: PRESCRIPTION_UPDATE_FAILED,
    payload: error,
});

export const getPrescriptionDelete = (id): PrescriptionAction => ({
    type: PRESCRIPTION_DELETE,
    payload: id,
});

export const getPrescriptionDeleteSuccess = (prescriptionDelete: string): PrescriptionAction => ({
    type: PRESCRIPTION_DELETE_SUCCESS,
    payload: prescriptionDelete,
});

export const getPrescriptionDeleteFailed = (error: string): PrescriptionAction => ({
    type: PRESCRIPTION_DELETE_FAILED,
    payload: error,
});
