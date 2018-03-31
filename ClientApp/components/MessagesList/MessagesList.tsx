import * as React from "react";
import { MessageModel } from "#models/domain";

const styles: any = require<any>("./MessagesList.scss");

export interface IMessagesListState {
  messages: MessageModel[];
}

export default class MessagesList extends React.Component<IMessagesListState, {}> {
    public render(): React.ReactNode {
        return <div className={styles.messagesList}>
            Messages:
            {
              this.props.messages.map(m => <div></div>)
            }
        </div>;
    }
}

function Message(message: MessageModel): React.ReactNode {
  return (
    <div>
      [{message.id}, {message.userId}]: {message.text}<br/>
    </div>
  );
}
