import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
const styles: any = require<any>("./style.scss");

export class TelegramLogin extends React.Component<{}, {}> {

    public componentDidMount(): void {
      (window as any).TelegramLoginWidget = {
        callbackOnAuth: (user: any) => this.onAuth(user)
      };

      const script: HTMLScriptElement = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?2";
      script.setAttribute("data-telegram-login", "ready_player_one_bot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "TelegramLoginWidget.callbackOnAuth(user)");
      script.async = true;

      document.body.appendChild(script);
    }

    private onAuth(user: any): void {
      alert(JSON.stringify(user));
    }

    public render(): React.ReactNode {
      return <div >
          <script
            async
            src="https://telegram.org/js/telegram-widget.js?4"
            data-telegram-login="ready_player_one_bot"
            data-size="large" data-onauth="this.onAuth(user)"
            data-request-access="write"></script>
        </div>;
    }
}