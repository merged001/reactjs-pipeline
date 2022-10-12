export const Types = {
  GET_DIRECTBUY_LIST: "GET_DIRECTBUY_LIST",
  GET_DIRECTBUY_LIST_SUCCESS: "GET_DIRECTBUY_LIST_SUCCESS",
  GET_AUCTION_LIST: "GET_AUCTION_LIST",
  GET_AUCTION_LIST_SUCCESS: "AUCTION_LIST_SUCCESS",
  SHOW_ERROR: "SHOW_ERROR",
  AUTHENTICATED: 'AUTHENTICATED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED'
};

export const getDirectBuyListRequest = () => ({
  type: Types.GET_DIRECTBUY_LIST,
});

export const getDirectBuyListSuccess = (data) => ({
  type: Types.GET_DIRECTBUY_LIST_SUCCESS,
  payload: data,
});

export const getAuctionListRequest = () => ({
  type: Types.GET_AUCTION_LIST,
});

export const getAuctionListSuccess = (data) => ({
  type: Types.GET_AUCTION_LIST_SUCCESS,
  payload: data,
});

export const showError = (err) => ({
  type: Types.SHOW_ERROR,
  error: err,
});

export const loginSuccess = (data) => ({
  type: Types.AUTHENTICATED,
  payload: data
});
export const loginFailed = (data) => ({
  type: Types.NOT_AUTHENTICATED,
  payload: data
});