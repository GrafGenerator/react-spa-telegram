import { fork } from "redux-saga/effects";
import coreSagas from "./core";

export default function* rootSaga() {
  yield fork(coreSagas);
}
