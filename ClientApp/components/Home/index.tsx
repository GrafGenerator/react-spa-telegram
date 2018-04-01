import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import MessagesList from "../MessagesList";
import { TelegramLogin } from "../telegramLogin";

const styles: any = require<any>("./Home.scss");

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render(): React.ReactNode {
        return <div className={styles.home}>
          <div className={styles.home__messagesBlock}>
            <MessagesList
              messages={[]}
              loadMoreMessages={() => { return; } }
              postMessage={() => { return; } }
              hasMoreMessages={true} />
          </div>
          <div className={styles.home__loginBlock}>
            <TelegramLogin/>
            <br/>
            <a href="https://github.com/GrafGenerator/react-spa-telegram">Source code</a>
          </div>
        </div>;
    }
}
