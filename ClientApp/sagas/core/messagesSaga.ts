import { call, put, takeLatest } from "redux-saga/effects";
import { getLatestMessages } from "#api";
import { MessageApiModel, IMessagesRequest } from "#models/api";
import { requestFailure} from "#store/requestStatus";
import {
  REQUEST_MESSAGES,
  RequestMessagesAction,
  RefreshMessagesAction,
  actionCreators,
  REFRESH_MESSAGES
} from "#store/messages";
import { ApiMessagesFetchCount } from "#config/constants";

function* getLatestMessagesRequest(action: RequestMessagesAction) {
  try {
    const request: IMessagesRequest = {
      pid: 1, // hardcode!!!
      offset: action.offset,
      count: action.count
    };

    const messages: MessageApiModel[] = yield call(getLatestMessages, request);

    yield put(actionCreators.successful(messages));
  } catch (e) {
    yield put(actionCreators.failed(requestFailure(400 /*WTF?!*/, e.message)));
  }
}

function* refreshMessages(action: RefreshMessagesAction) {
    yield put(actionCreators.request(0, ApiMessagesFetchCount));
}

function* messagesSaga() {
  yield takeLatest(REQUEST_MESSAGES, getLatestMessagesRequest);
  yield takeLatest(REFRESH_MESSAGES, refreshMessages);
}

export default messagesSaga;
