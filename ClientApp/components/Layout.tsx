import * as React from "react";

export class Layout extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return <div>
            { this.props.children }
        </div>;
    }
}
