import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import './Footer.scss';

export interface FooterProps {
    showChangeShortfutsButton: boolean;
}

export default class Footer extends React.Component<FooterProps, {}> {
    constructor(props: FooterProps, state: {}) {
        super(props, state);
    }

    render() {
        return (
            <div className="footer ms-bgColor-themeLighterAlt">
                {/* Donate button */}
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
                {/* Change shortcuts button */}
                {this.props.showChangeShortfutsButton && (
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
                )}
                {/* Contact button */}
                <ActionButton
                    iconProps={{ iconName: 'Mail' }}
                    onClick={() => {
                        chrome.runtime.sendMessage({
                            contactDeveloper: true
                        });
                    }}
                >
                    Contact developer
                </ActionButton>
            </div>
        );
    }
}
