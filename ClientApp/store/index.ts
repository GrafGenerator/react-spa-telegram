import * as Messages from "./messages";
import * as PostMessage from "./postMessage";

export interface IApplicationState {
  messages: Messages.IMessagesState;
  postMessage: PostMessage.IPostMessageState;
}

export const reducers: any = {
  messages: Messages.reducer,
  postMessage: PostMessage.reducer
};

export const getMessages: (state: IApplicationState) => Messages.IMessagesState = (state) => state.messages;
export const getPostMessage: (state: IApplicationState) => PostMessage.IPostMessageState = (state) => state.postMessage;
