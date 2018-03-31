import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Popup.scss';

interface AppProps {}

interface AppState {}

type Command = chrome.commands.Command;

@observer
export default class Popup extends React.Component<AppProps, AppState> {
    @observable
    private commands: Map<string, Command> = new Map<string, Command>();

    constructor(props: AppProps, state: AppState) {
        super(props, state);
    }

    componentWillMount() {
        chrome.commands.getAll((commands: Command[]) => {
            console.log(commands);

            for (const command of commands) {
                this.commands.set(command.name, command);
            }
        });
    }

    componentDidMount() {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ popupMounted: true });
    }

    render() {
        return (
            <div className="popupContainer ms-Fabric">
                {this.renderShortfuts()}
            </div>
        );
    }

    /**
     * Renders all available shortcuts.
     */
    renderShortfuts() {
        // Don't render anything if commands haven't loaded yet.
        if (!this.commands) {
            return <div />;
        }

        // Build array from map.
        const commandArray = Array.from(this.commands);

        return (
            <div className="shortfutsList">
                {commandArray.map(this.renderShortfut)}
            </div>
        );
    }

    /**
     * Renders an individual shortcut.
     */
    renderShortfut([key, command]: [string, Command]) {
        return (
            <div className="shortfut" key={command.name}>
                <span className="shortfutDescription">
                    {command.description || 'Open extension popup'}
                </span>
                <span className="ms-fontWeight-semibold shortfutShortcut">
                    {command.shortcut || 'Not set'}
                </span>
            </div>
        );
    }
}
