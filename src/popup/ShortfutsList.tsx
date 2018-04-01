import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './ShortfutsList.scss';

// Aliases type to save typing.
type Command = chrome.commands.Command;

@observer
export default class ShortfutsList extends React.Component<{}, {}> {
    @observable
    private commands: Map<string, Command> = new Map<string, Command>();

    componentWillMount() {
        // Gets configured shortcuts for shortfuts.
        chrome.commands.getAll((commands: Command[]) => {
            for (const command of commands) {
                this.commands.set(command.name, command);
            }
        });
    }

    render() {
        // Don't render anything if commands haven't loaded yet.
        if (!this.commands) {
            return null;
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
                    {command.description ||
                        'Open extension popup (Activate the extension)'}
                </span>
                {command.shortcut ? (
                    <span className="ms-fontWeight-semibold shortfutShortcut">
                        {command.shortcut}
                    </span>
                ) : (
                    <Link
                        className="ms-fontWeight-semibold shortfutSetShortcut"
                        onClick={() => {
                            chrome.runtime.sendMessage({
                                changeShortcuts: true
                            });
                        }}
                    >
                        (Set)
                    </Link>
                )}
            </div>
        );
    }
}
