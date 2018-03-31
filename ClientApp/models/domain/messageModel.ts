export class MessageModel {
  constructor(
    public id: number,
    public text: string,
    public channelId: number,
    public userId: number | null
  ) {
  }
}
