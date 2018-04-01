import { UserModel } from "#models/domain";

export class MessageModel {
  constructor(
    public id: number,
    public text: string,
    public user: UserModel | null
  ) {
  }
}
