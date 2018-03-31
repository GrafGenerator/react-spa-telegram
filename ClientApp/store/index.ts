import * as Messages from "./messages";

export interface IApplicationState {
  messages: Messages.IMessagesState;
}

export const reducers = {
  messages: Messages.reducer,
};

export const getMessages: (state: IApplicationState) => Messages.IMessagesState = (state) => state.messages;
