import config from '../../config'; 

import * as actionTypes from '../featuresFrontend/action';

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

const customReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
      case actionTypes.MENU_OPEN:
        id = action.id;
        return {
          ...state,
          isOpen: [id]
        };
      case actionTypes.SET_MENU:
        return {
          ...state,
          opened: action.opened
        };
      case actionTypes.SET_FONT_FAMILY:
        return {
          ...state,
          fontFamily: action.fontFamily
        };
      case actionTypes.SET_BORDER_RADIUS:
        return {
          ...state,
          borderRadius: action.borderRadius
        };
      default:
        return state;
    }
}

export default customReducer