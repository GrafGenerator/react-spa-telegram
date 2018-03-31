import { call, put, takeLatest } from "redux-saga/effects";
import { getAllCategories } from "#api";
import { ResourceEntryCategoryApiModel } from "#models/api";
import { requestFailure} from "#store/requestStatus";
import {
  REQUEST_RESOURCE_ENTRY_CATEGORIES,
  RequestResourceEntryCategoriesAction,
  actionCreators
} from "#store/ResourceEntryCategories";

function* getAllCategoriesRequest(action: RequestResourceEntryCategoriesAction) {
  try {
    const categories: ResourceEntryCategoryApiModel[] = yield call(getAllCategories);

    yield put(actionCreators.successful(categories));
    // TODO: routes?
  } catch (e) {
    yield put(actionCreators.failed(requestFailure(400 /*WTF?!*/, e.message)));
  }
}

function* resourseEntryCategoriesSaga() {
  yield takeLatest(REQUEST_RESOURCE_ENTRY_CATEGORIES, getAllCategoriesRequest);
}

export default resourseEntryCategoriesSaga;
