import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { loadTheme } from '@uifabric/styling';
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
        loadTheme({
            palette: {
                themePrimary: '#201c55',
                themeLighterAlt: '#ebeaf8',
                themeLighter: '#ccc9ed',
                themeLight: '#827dd4',
                themeTertiary: '#3b349f',
                themeSecondary: '#242061',
                themeDarkAlt: '#1c194c',
                themeDark: '#141236',
                themeDarker: '#110f2e',
                neutralLighterAlt: '#f8f8f8',
                neutralLighter: '#f4f4f4',
                neutralLight: '#eaeaea',
                neutralQuaternaryAlt: '#dadada',
                neutralQuaternary: '#d0d0d0',
                neutralTertiaryAlt: '#c8c8c8',
                neutralTertiary: '#a6a6a6',
                neutralSecondary: '#666666',
                neutralPrimaryAlt: '#3c3c3c',
                neutralPrimary: '#333',
                neutralDark: '#212121',
                black: '#1c1c1c',
                white: '#fff'
            }
        });

        chrome.commands.getAll((commands: Command[]) => {
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
                <div className="footer">
                    <ActionButton
                        iconProps={{ iconName: 'EditStyle' }}
                        onClick={() => {
                            chrome.runtime.sendMessage({
                                changeShortcuts: true
                            });
                        }}
                    >
                        Change shortcuts
                    </ActionButton>
                    <ActionButton
                        iconProps={{ iconName: 'DiamondSolid' }}
                        onClick={() => {
                            window.open(
                                'https://www.paypal.me/martellaj/5',
                                '_blank'
                            );
                        }}
                    >
                        Donate
                    </ActionButton>
                </div>
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
