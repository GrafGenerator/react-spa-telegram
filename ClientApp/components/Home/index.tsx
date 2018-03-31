import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import MessagesList from "../MessagesList";
import { TelegramLogin } from "../telegramLogin";

const styles: any = require<any>("./Home.scss");

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render(): React.ReactNode {
        return <div className={styles.home}>
            <MessagesList messages={[]}/>
            <div>
              <TelegramLogin/>
            </div>
        </div>;
    }
}
