import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api";

function* getDirectBuyList() {
  try {
    const result = yield call(api.getDirectBuyList);
    yield put(actions.getDirectBuyListSuccess(result.data.data));
  } catch (error) {
    console.log(error);
    yield put(actions.showError(error.message));
  }
}

function* watchGetDirectBuyRequest() {
  yield takeEvery(actions.Types.GET_DIRECTBUY_LIST, getDirectBuyList);
}

function* getAuctionList() {
  try {
    const result = yield call(api.getAuctionList);
    yield put(actions.getAuctionListSuccess(result.data.data));
  } catch (error) {
    console.log(error);
    yield put(actions.showError(error.message));
  }
}

function* watchGetAuctionRequest() {
  yield takeEvery(actions.Types.GET_AUCTION_LIST, getAuctionList);
}

const allSagas = [fork(watchGetDirectBuyRequest), fork(watchGetAuctionRequest)];

export default allSagas;
