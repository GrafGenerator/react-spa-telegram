import { Reducer, AnyAction } from "redux";
import { MessageModel } from "#models/domain/messageModel";
import {
  IRequestError,
  IRequestStatus,
  RequestStatus
} from "#store/requestStatus";

// ===== State =====

export interface IPostMessageState {
    status: IRequestStatus;
}

const initialState: IPostMessageState = {
  status: {
    status: RequestStatus.Undefined,
    error: null
  }
};

// ===== Action names =====
export const POST_MESSAGE: string = "post-message/post";
export const POST_MESSAGE_SUCCESSFUL: string = "post-message/post-message-sussessful";
export const POST_MESSAGE_FAILED: string = "post-message/post-message-failed";

// ===== Actions =====

export type PostMessageAction = {
  type: typeof POST_MESSAGE;
  userId: number | null;
  text: string;
};

export type PostMessageSuccessfulAction = {
  type: typeof POST_MESSAGE_SUCCESSFUL;
  postedMessage: MessageModel;
};

export type PostMessageFailedAction = {
  type: typeof POST_MESSAGE_FAILED,
  error: IRequestError
};

type KnownAction = PostMessageAction
  | PostMessageSuccessfulAction
  | PostMessageFailedAction;

// ===== Action creators =====

export interface IPostMessageActionCreators {
  post: (userId: number | null, text: string) => PostMessageAction;
  successful: (message: MessageModel) => PostMessageSuccessfulAction;
  failed: (error: IRequestError) => PostMessageFailedAction;
}

export const actionCreators: IPostMessageActionCreators = {
  post: (userId, text): PostMessageAction => ({
    type: POST_MESSAGE,
    userId,
    text
  }),

  successful: (postedMessage: MessageModel): PostMessageSuccessfulAction => ({
    type: POST_MESSAGE_SUCCESSFUL,
    postedMessage,
  }),

  failed: (error: IRequestError): PostMessageFailedAction => ({
    type: POST_MESSAGE_FAILED,
    error
  }),
};

// ===== Reducer =====

export const reducer: Reducer<IPostMessageState> =
  (state: IPostMessageState = initialState, action: KnownAction | any) => {
    switch (action.type) {
      case POST_MESSAGE:
        const inProgressStatus: IRequestStatus = {
          ...state.status,
          status: RequestStatus.InProgress
        };

        return {
          ...state,
          status: inProgressStatus
        };

      case POST_MESSAGE_FAILED:
        const failedAction: PostMessageFailedAction = <PostMessageFailedAction>action;

        const failedStatus: IRequestStatus = {
          ...state.status,
          status: RequestStatus.Failed,
          error: failedAction.error
        };

        return {
          ...state,
          status: failedStatus,
        };

      default:
        // the following line guarantees that every action in the KnownAction union has been covered by a case above
        // const exhaustiveCheck: never = action;
    }

    return state || initialState;
};
