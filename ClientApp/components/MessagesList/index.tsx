import { connect } from "react-redux";
import MessagesList from "./MessagesList";
import { IMessagesListState } from "./MessagesList";

import { getMessages, IApplicationState } from "#store";

function mapStateToProps(state: IApplicationState): IMessagesListState {
  return {
    messages: getMessages(state).items
  };
}

const mapDispatchToProps: any = (dispatch: Function) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);
