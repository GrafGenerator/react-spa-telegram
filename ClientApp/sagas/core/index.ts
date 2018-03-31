import resourseEntryCategoriesSaga from "./resourceEntryCategoriesSaga";

export default function* coreSagas(){
  yield* resourseEntryCategoriesSaga();
}
