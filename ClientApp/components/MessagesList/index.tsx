import { connect } from "react-redux";
import MessagesList from "./MessagesList";
import { IMessagesListProps } from "./MessagesList";

import { getMessages, IApplicationState } from "#store";
import { actionCreators as messageActionCreators, IMessagesState } from "#store/messages";
import { ApiMessagesFetchCount } from "#config/constants";
import { actionCreators as postMessageActionCreators } from "#store/postMessage";

function mapStateToProps(state: IApplicationState): any {
  const messages: IMessagesState = getMessages(state);

  return {
    messages: messages.items,
    hasMoreMessages: messages.hasMore
  };
}

const mapDispatchToProps: any = (dispatch: Function) => ({
  loadMoreMessages: (currentCount: number) => dispatch(messageActionCreators.request(currentCount, ApiMessagesFetchCount)),
  postMessage: (userId: number | null, text: string) => dispatch(postMessageActionCreators.post(userId, text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
