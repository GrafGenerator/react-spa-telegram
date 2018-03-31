import { Reducer } from "redux";
import { ResourceEntryCategoryModel as ResourceEntryCategory } from "#models/domain/ResourceEntryCategoryModel";
import { ResourceEntryCategoryModel } from "#models/domain"
import {
  IRequestError,
  IRequestStatus,
  RequestStatus
} from "#store/requestStatus";

// ===== State =====

export interface ResourceEntryCategoriesState {
    items: ResourceEntryCategory[];
    status: IRequestStatus;
}

const initialState = {
  items: [],
  status: {
    status: RequestStatus.Undefined,
    error: null
  }
};

// ===== Action names =====
export const REQUEST_RESOURCE_ENTRY_CATEGORIES = "resource-entry-categories/request";
export const REQUEST_RESOURCE_ENTRY_CATEGORIES_SUCCESSFUL = "resource-entry-categories/request-sussessful";
export const REQUEST_RESOURCE_ENTRY_CATEGORIES_FAILED = "resource-entry-categories/request-failed";

// ===== Actions =====

export interface RequestResourceEntryCategoriesAction { type: typeof REQUEST_RESOURCE_ENTRY_CATEGORIES }
export interface RequestResourceEntryCategoriesSuccessfulAction {
  type: typeof REQUEST_RESOURCE_ENTRY_CATEGORIES_SUCCESSFUL,
  categories: ResourceEntryCategoryModel[]
}
export type RequestResourceEntryCategoriesFailedAction = {
  type: typeof REQUEST_RESOURCE_ENTRY_CATEGORIES_FAILED,
  error: IRequestError
}

type KnownAction = RequestResourceEntryCategoriesAction
  | RequestResourceEntryCategoriesSuccessfulAction
  | RequestResourceEntryCategoriesFailedAction;

// ===== Action creators =====

export const actionCreators = {
  request: (): RequestResourceEntryCategoriesAction => ({ type: REQUEST_RESOURCE_ENTRY_CATEGORIES }),

  successful: (categories: any): RequestResourceEntryCategoriesSuccessfulAction => ({
    type: REQUEST_RESOURCE_ENTRY_CATEGORIES_SUCCESSFUL,
    categories
  }),

  failed: (error: IRequestError): RequestResourceEntryCategoriesFailedAction => ({
    type: REQUEST_RESOURCE_ENTRY_CATEGORIES_FAILED,
    error
  })
};

// ===== Reducer =====

export const reducer: Reducer<ResourceEntryCategoriesState> =
  (state: ResourceEntryCategoriesState = initialState, action: KnownAction) => {
    switch (action.type) {
      case REQUEST_RESOURCE_ENTRY_CATEGORIES:
        const inProgressStatus = {
          ...state.status,
          status: RequestStatus.InProgress
        };

        return {
          ...state,
          status: inProgressStatus
        };

      case REQUEST_RESOURCE_ENTRY_CATEGORIES_SUCCESSFUL:
        const successfulAction = <RequestResourceEntryCategoriesSuccessfulAction>action;

        const successfulStatus = {
          ...state.status,
          status: RequestStatus.Successful
        };

        return {
          ...state,
          status: successfulStatus,
          items: successfulAction.categories
        };

      case REQUEST_RESOURCE_ENTRY_CATEGORIES_FAILED:
        const failedAction = <RequestResourceEntryCategoriesFailedAction>action;

        const failedStatus = {
          ...state.status,
          status: RequestStatus.Failed,
          error: failedAction.error
        };

        return {
          ...state,
          status: failedStatus,
        };

      default:
          // The following line guarantees that every action in the KnownAction union has been covered by a case above
        // noinspection JSUnusedLocalSymbols
        const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || initialState;
};
