import coreSagas from "./core";

export default function* rootSaga() {
  yield* coreSagas();
}
