import * as React from "react";
import { MessageModel } from "#models/domain";
import { ApiMessagesFetchCount, HardcodedUserId } from "#config/constants";
import classNames from "classnames/bind";

const styles: any = require<any>("./MessagesList.scss");
const cn: Function = classNames.bind(styles);

export interface IMessagesListProps {
  messages: MessageModel[];
  loadMoreMessages: (currentCount: number) => void;
  postMessage: (userId: number | null, text: string) => void;
  hasMoreMessages: boolean;
}

export default class MessagesList extends React.Component<IMessagesListProps, {}> {
    public render(): React.ReactNode {
        return <div className={styles.messagesList}>
          <MessagesInner { ...this.props } />
          <PostMessage { ...this.props } />
        </div>;
    }
}

function MessagesInner({messages, loadMoreMessages, hasMoreMessages }: IMessagesListProps): React.ReactElement<IMessagesListProps> {
  const loadMoreStyles: any = cn(
    "messagesList__loadMore",
    {
      "messagesList__loadMore--unavailable": !hasMoreMessages
    });

  return (
    <div className={styles.messagesList__inner}>
      {
        messages
          .sort((a, b) => ( a.id < b.id ? 1 : a.id > b.id ? -1 : 0 ))
          .map(message => <Message key={message.id} {...{message}}/>)
      }
      <div
        className={loadMoreStyles}
        onClick={() => loadMoreMessages(Math.floor(messages.length / ApiMessagesFetchCount) + 1)}>
        Load more
      </div>
    </div>
  );
}

type MessageProps = {message: MessageModel};
function Message({message}: MessageProps): React.ReactElement<MessageProps> {
  const messageStyles: any = cn(
    "message",
    {
      "message--self": message.user && message.user.id === HardcodedUserId
    });

  return (
    <div className={messageStyles}>
      <div className={styles.message_author}>
        { message.user && message.user.id !== 1
            ? message.user.firstName + " " + message.user.lastName
            : "Anonymous"}
      </div>
      <div className={styles.message_text}>{message.text}</div>
    </div>
  );
}

type PostMessageProps = { postMessage: (userId: number | null, text: string) => void; };
function PostMessage({ postMessage }: PostMessageProps): React.ReactElement<PostMessageProps> {
  let areaInput: HTMLTextAreaElement | null;

  return (
    <div className={styles.postMessage}>
      <div className={styles.postMessage__commentText}>
        <textarea placeholder="Enter your comment here" ref={ el => areaInput = el }/>
      </div>
      <div className={styles.postMessage__actions}>
        <div
          className={styles.postMessage__sendButton}
          onClick={() => postMessage(HardcodedUserId, areaInput && areaInput.value || "")}>
          Send
        </div>
        <div
          className={styles.postMessage__sendButton}
          onClick={() => postMessage(null, areaInput && areaInput.value || "")}>
          Send anonymous
        </div>
      </div>
    </div>
  );
}
