import { call, put, takeLatest } from "redux-saga/effects";
import { postMessage } from "#api";
import { IMessageApiModel, IPostMessageRequest, IMessageUserApiModel } from "#models/api";
import { requestFailure} from "#store/requestStatus";
import { MessageModel, UserModel } from "#models/domain";
import { PostMessageAction, POST_MESSAGE, actionCreators } from "#store/postMessage";
import { HardcodedPostId } from "#config/constants";

function* postMessageRequest(action: PostMessageAction): any {
  try {
    const request: IPostMessageRequest = {
      channel_post: HardcodedPostId, // hardcode!!!
      comment_text: action.text
    };

    if(action.userId !== null) {
      request.uid = action.userId;
    }

    const messagesApiModels: IMessageApiModel[] = yield call(postMessage, request);
    const messagesApiModel: IMessageApiModel = messagesApiModels[0];
    const u: IMessageUserApiModel = messagesApiModel.user;
    const user: UserModel = new UserModel(u.id, u.first_name, u.last_name, u.user_name);
    const message: MessageModel = new MessageModel(messagesApiModel.id, messagesApiModel.comment_text, user);

    yield put(actionCreators.successful(message));
  } catch (e) {
    yield put(actionCreators.failed(requestFailure(400 /*WTF?!*/, e.message)));
  }
}

function* postMessageSaga(): any {
  yield takeLatest(POST_MESSAGE, postMessageRequest);
}

export default postMessageSaga;
