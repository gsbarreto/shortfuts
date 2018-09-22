import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './ShortfutsList.scss';

// Aliases type to save typing.
type Command = chrome.commands.Command;

export interface ShortcutsListProps {
    isNativeShortcuts: boolean;
}

@observer
export default class ShortfutsList extends React.Component<
    ShortcutsListProps,
    {}
> {
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
        const commandArray = this.props.isNativeShortcuts
            ? Array.from(this.commands)
            : Array.from(this.buildLegacyShortcutsList());

        if (this.props.isNativeShortcuts) {
            commandArray.sort(
                (
                    [keyA, commandA]: [string, Command],
                    [keyB, commandB]: [string, Command]
                ) => {
                    // Push commands that aren't set to end.
                    if (!commandA.shortcut) {
                        return 1;
                    }

                    if (commandA.shortcut < commandB.shortcut) {
                        return -1;
                    } else if (commandA.shortcut > commandB.shortcut) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            );
        }

        return (
            <div className="shortfutsListContainer">
                <div className="shortfutsList">
                    {commandArray.map(this.renderShortfut)}
                </div>
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

    buildLegacyShortcutsList() {
        const map: Map<any, any> = new Map();

        map.set('altSpace', {
            description: 'Toggles the extension on and off',
            name: 'Alt+Space',
            shortcut: 'Alt+Space'
        });
        map.set('s', {
            description: 'Stores current item in the club',
            name: 'S',
            shortcut: 'S'
        });
        map.set('n', {
            description: 'Buys the current item for BIN price',
            name: 'N',
            shortcut: 'N'
        });
        map.set('c', {
            description:
                'Compares price of the current item with other items on the market',
            name: 'C',
            shortcut: 'C'
        });
        map.set('q', {
            description: 'Quick sells the current item',
            name: 'Q',
            shortcut: 'Q'
        });
        map.set('t', {
            description: 'Sends current item to transfer list',
            name: 'T',
            shortcut: 'T'
        });
        map.set('m', {
            description: 'Lists the current item for minimum BIN',
            name: 'M',
            shortcut: 'M'
        });
        map.set('l', {
            description:
                'Lists the current item (with currently selected price range)',
            name: 'L',
            shortcut: 'L'
        });
        map.set('b', {
            description: 'Buys a bronze pack',
            name: 'B',
            shortcut: 'B'
        });
        map.set('w', {
            description: `Toggles current item's status on your transfer targets list`,
            name: 'W',
            shortcut: 'W'
        });
        map.set('d', {
            description: `Makes a bid on the current item`,
            name: 'D',
            shortcut: 'D'
        });
        map.set('=', {
            description: `Searches the transfer market`,
            name: '=',
            shortcut: '='
        });
        map.set('o', {
            description: `Decrease minimum bid price`,
            name: 'O',
            shortcut: 'O'
        });
        map.set('p', {
            description: `Increase minimum bid price`,
            name: 'P',
            shortcut: 'P'
        });

        return map;
    }
}
