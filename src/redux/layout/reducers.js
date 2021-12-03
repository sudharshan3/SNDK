// @flow
import {
    CHANGE_LAYOUT,
    CHANGE_LAYOUT_WIDTH,
    CHANGE_SIDEBAR_THEME,
    CHANGE_SIDEBAR_TYPE,
    
} from './constants';

import * as layoutConstants from '../../constants/layout';

const INIT_STATE = {
    layoutType: layoutConstants.LAYOUT_VERTICAL,
    layoutWidth: layoutConstants.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: layoutConstants.LEFT_SIDEBAR_THEME_LIGHT ,
    leftSideBarType: layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
    
};

type LayoutAction = { type: string, payload?: string | null };


const Layout = (state: State = INIT_STATE, action: LayoutAction) => {
    
    switch (action.type) {
        case CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };
        case CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
            };
        case CHANGE_SIDEBAR_THEME:
         
            return {
                ...state,
                leftSideBarTheme: action.payload,
            };
        case CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload,
            };
     
    
        default:
            return state;
    }
};

export default Layout;
