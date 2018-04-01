import { call, put, takeLatest } from "redux-saga/effects";
import { getLatestMessages } from "#api";
import { IMessageApiModel, IMessagesRequest } from "#models/api";
import { requestFailure} from "#store/requestStatus";
import {
  REQUEST_MESSAGES,
  RequestMessagesAction,
  RefreshMessagesAction,
  actionCreators,
  REFRESH_MESSAGES
} from "#store/messages";
import { ApiMessagesFetchCount, HardcodedPostId } from "#config/constants";
import { MessageModel, UserModel } from "#models/domain";

function* getLatestMessagesRequest(action: RequestMessagesAction): any {
  try {
    const request: IMessagesRequest = {
      pid: HardcodedPostId, // hardcode!!!
      offset: action.offset,
      count: action.count
    };

    const messagesApiModels: IMessageApiModel[] = yield call(getLatestMessages, request);

    const messages: MessageModel[] = messagesApiModels.map(a => {
      const user: UserModel = new UserModel(a.user.id, a.user.first_name, a.user.last_name, a.user.user_name);

      return new MessageModel(a.id, a.comment_text, user);
    });

    yield put(actionCreators.successful(messages, action.count));
  } catch (e) {
    yield put(actionCreators.failed(requestFailure(400 /*WTF?!*/, e.message)));
  }
}

function* refreshMessages(action: RefreshMessagesAction): any {
    yield put(actionCreators.request(0, ApiMessagesFetchCount));
}

function* messagesSaga(): any {
  yield takeLatest(REQUEST_MESSAGES, getLatestMessagesRequest);
  yield takeLatest(REFRESH_MESSAGES, refreshMessages);
}

export default messagesSaga;
