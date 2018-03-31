import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { TelegramLogin } from "../telegramLogin";

const styles: any = require<any>("./Home.scss");

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render(): React.ReactNode {
        return <div className={styles.home}>
            <div>
              <h1>Hello, world!</h1>
            </div>
            <div>
              <TelegramLogin/>
            </div>
        </div>;
    }
}
