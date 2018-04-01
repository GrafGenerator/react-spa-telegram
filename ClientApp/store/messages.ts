import { Reducer } from "redux";
import { MessageModel } from "#models/domain/messageModel";
import {
  IRequestError,
  IRequestStatus,
  RequestStatus
} from "#store/requestStatus";
import { PostMessageSuccessfulAction, POST_MESSAGE_SUCCESSFUL } from "#store/postMessage";

import { groupBy, map, Dictionary } from "lodash";


// ===== State =====

export interface IMessagesState {
    items: MessageModel[];
    hasMore: boolean;
    status: IRequestStatus;
}

const initialState: IMessagesState = {
  items: [],
  hasMore: true,
  status: {
    status: RequestStatus.Undefined,
    error: null
  }
};

// ===== Action names =====
export const REQUEST_MESSAGES: string = "messages/request";
export const REQUEST_MESSAGES_SUCCESSFUL: string = "messages/request-sussessful";
export const REQUEST_MESSAGES_FAILED: string = "messages/request-failed";
export const REFRESH_MESSAGES: string = "messages/refresh";

// ===== Actions =====

export type RequestMessagesAction = {
  type: typeof REQUEST_MESSAGES;
  offset: number;
  count: number;
};

export type RequestMessagesSuccessfulAction = {
  type: typeof REQUEST_MESSAGES_SUCCESSFUL;
  messages: MessageModel[];
  requestedCount: number;
};

export type RequestMessagesFailedAction = {
  type: typeof REQUEST_MESSAGES_FAILED,
  error: IRequestError
};

export type RefreshMessagesAction = {
  type: typeof REFRESH_MESSAGES;
};

type KnownAction = RequestMessagesAction
  | RequestMessagesSuccessfulAction
  | RequestMessagesFailedAction
  | RefreshMessagesAction
  | PostMessageSuccessfulAction;

// ===== Action creators =====

export interface IMessageActionCreators {
  request: (offset: number, count: number) => RequestMessagesAction;
  successful: (messages: MessageModel[], requestedCount: number) => RequestMessagesSuccessfulAction;
  failed: (error: IRequestError) => RequestMessagesFailedAction;
  refresh: () => RefreshMessagesAction;
}

export const actionCreators: IMessageActionCreators = {
  request: (offset: number, count: number): RequestMessagesAction => ({
    type: REQUEST_MESSAGES,
    offset,
    count
  }),

  successful: (messages: MessageModel[], requestedCount: number): RequestMessagesSuccessfulAction => ({
    type: REQUEST_MESSAGES_SUCCESSFUL,
    messages,
    requestedCount
  }),

  failed: (error: IRequestError): RequestMessagesFailedAction => ({
    type: REQUEST_MESSAGES_FAILED,
    error
  }),

  refresh: (): RefreshMessagesAction => ({
    type: typeof(REFRESH_MESSAGES)
  })
};

// ===== Reducer =====

function mergeMessages(coll1: MessageModel[], coll2: MessageModel[]): MessageModel[] {
  const grouped: Dictionary<MessageModel[]> = groupBy(
    [ ...coll1, ...coll2],
    (m) => m.id
  );

  const merged: MessageModel[] = map(
    grouped,
    m => m[m.length - 1]
  );

  return merged;
}

export const reducer: Reducer<IMessagesState> =
  (state: IMessagesState = initialState, action: KnownAction) => {
    switch (action.type) {
      case REQUEST_MESSAGES:
        const inProgressStatus: IRequestStatus = {
          ...state.status,
          status: RequestStatus.InProgress
        };

        return {
          ...state,
          status: inProgressStatus
        };

      case REQUEST_MESSAGES_SUCCESSFUL:
        const successfulAction: RequestMessagesSuccessfulAction = <RequestMessagesSuccessfulAction>action;

        const successfulStatus: IRequestStatus = {
          ...state.status,
          status: RequestStatus.Successful
        };

        return {
          ...state,
          status: successfulStatus,
          items: mergeMessages(state.items, successfulAction.messages),
          hasMore: successfulAction.messages.length === successfulAction.requestedCount
        };

      case REQUEST_MESSAGES_FAILED:
        const failedAction: RequestMessagesFailedAction = <RequestMessagesFailedAction>action;

        const failedStatus: IRequestStatus = {
          ...state.status,
          status: RequestStatus.Failed,
          error: failedAction.error
        };

        return {
          ...state,
          status: failedStatus,
        };

      case REFRESH_MESSAGES:
        const refreshAction: RefreshMessagesAction = <RefreshMessagesAction>action;

        return initialState;

      case POST_MESSAGE_SUCCESSFUL:
        const postSuccessfulAction: PostMessageSuccessfulAction = <PostMessageSuccessfulAction>action;

        return {
          ...state,
          items: mergeMessages([postSuccessfulAction.postedMessage], state.items)
        };

      default:
        // the following line guarantees that every action in the KnownAction union has been covered by a case above
        // const exhaustiveCheck: never = action;
    }

    return state || initialState;
};
