import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import './Footer.scss';

export default class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="footer">
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
            </div>
        );
    }
}
