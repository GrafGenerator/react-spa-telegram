export interface IMessageApiModel {
  id: number;
  comment_text: string;
  user: IMessageUserApiModel;
}

export interface IMessageUserApiModel {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
}

export interface IMessagesRequest {
  pid: number;
  offset: number;
  count: number;
}

export interface IPostMessageRequest {
  uid?: number;
  channel_post: number;
  comment_text: string;
}
