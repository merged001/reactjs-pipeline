import { Types } from "../actions";

const initialState = {
    isAuthenticated:false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.AUTHENTICATED :
        return {
          ...state,
          ...action.payload
        };
      case Types.NOT_AUTHENTICATED:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };