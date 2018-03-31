import { call, put } from "redux-saga/effects";
import { getLatestMessages } from "#api";
import {
  actionCreators,
} from "#store/messages";
import { ApiMessagesFetchCount } from "#config/constants";

function* getCommentsSaga() {
  yield put(actionCreators.request(0, ApiMessagesFetchCount));
}

function* startupSaga() {
  yield call(getCommentsSaga);
}

export default startupSaga;
