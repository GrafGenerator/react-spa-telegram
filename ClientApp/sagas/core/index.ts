import { fork } from "redux-saga/effects";
import messagesSaga from "./messagesSaga";
import postMessageSaga from "./postMessageSaga";
import startupSaga from "./startupSaga";


export default function* coreSagas() {
  yield fork(startupSaga);
  yield fork(messagesSaga);
  yield fork(postMessageSaga);
}
