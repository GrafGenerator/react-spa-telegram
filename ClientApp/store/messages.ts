import { Reducer } from "redux";
import { MessageModel } from "#models/domain/messageModel";
import {
  IRequestError,
  IRequestStatus,
  RequestStatus
} from "#store/requestStatus";

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
  | RefreshMessagesAction;

// ===== Action creators =====

export const actionCreators: any = {
  request: (offset: number, count: number): RequestMessagesAction => ({
    type: REQUEST_MESSAGES,
    offset,
    count
  }),

  successful: (messages: any): RequestMessagesSuccessfulAction => ({
    type: REQUEST_MESSAGES_SUCCESSFUL,
    messages
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
          items: [
            ...state.items,
            ...successfulAction.messages
          ],
          hasMore: successfulAction.messages.length > 0
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

      default:
        // the following line guarantees that every action in the KnownAction union has been covered by a case above
        // const exhaustiveCheck: never = action;
    }

    return state || initialState;
};
