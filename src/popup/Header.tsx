import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { observer } from 'mobx-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './Header.scss';

export interface HeaderProps {
    isNativeShortcuts: boolean;
    onShortcutsModeToggled: (isNativeShortcuts: boolean) => void;
}

@observer
export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className="header ms-bgColor-themePrimary ms-fontColor-themeLighter">
                <span className="headerTitle">shortfuts</span>

                <div className="headerButtons">
                    {/* Donate button */}
                    <ActionButton
                        iconProps={{
                            iconName: 'DiamondSolid',
                            style: {
                                color: 'white'
                            }
                        }}
                        onClick={() => {
                            window.open(
                                'https://www.paypal.me/martellaj/5',
                                '_blank'
                            );
                        }}
                        style={{
                            color: 'white'
                        }}
                    >
                        Donate
                    </ActionButton>

                    {/* Contact button */}
                    <ActionButton
                        iconProps={{
                            iconName: 'Mail',
                            style: { color: 'white' }
                        }}
                        onClick={() => {
                            chrome.runtime.sendMessage({
                                contactDeveloper: true
                            });
                        }}
                        style={{
                            color: 'white'
                        }}
                    >
                        Contact
                    </ActionButton>
                </div>
            </div>
        );
    }

    private onToggleChanged = (value: boolean) => {
        this.props.onShortcutsModeToggled(value);
    };
}
