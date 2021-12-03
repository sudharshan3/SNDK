// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Prescription from './prescription/reducers';
import Customer from './customer/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Prescription,
    Customer
});
