export class MessageApiModel {
  constructor(
    public id: number,
    public text: string,
    public channelId: number,
    public userId: number | null
  ) {
  }
}

export interface IMessagesRequest {
  pid: number;
  offset: number;
  count: number;
}
