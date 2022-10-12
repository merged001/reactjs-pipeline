import { Types } from "../actions";

const initialState = {
  directbuyList: [],
  auctionList: [],
  error: "",
  loading: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_DIRECTBUY_LIST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_DIRECTBUY_LIST_SUCCESS:
      return {
        ...state,
        directbuyList: action.payload,
        loading: false,
      };
    case Types.GET_AUCTION_LIST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_AUCTION_LIST_SUCCESS:
      return {
        ...state,
        auctionList: action.payload,
        loading: false,
      };
    case Types.SHOW_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
