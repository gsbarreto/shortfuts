import * as React from 'react';
import Footer from './popup/Footer';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { loadTheme } from '@uifabric/styling';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Announcement.scss';

// Replace OUFR default theme with FIFA 18 color theme.
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

const ANNOUNCEMENT_VERSION = 4;

@observer
export default class Announcement extends React.Component<{}, {}> {
    @observable private isOpen: boolean = false;

    componentDidMount() {
        chrome.storage.sync.get('announcementVersion', data => {
            if (
                data.announcementVersion === undefined ||
                data.announcementVersion < ANNOUNCEMENT_VERSION
            ) {
                this.isOpen = true;

                // Set current version to storage.
                chrome.storage.sync.set({
                    announcementVersion: ANNOUNCEMENT_VERSION
                });
            }
        });
    }

    render() {
        return (
            <Modal isOpen={this.isOpen} onDismiss={this.onModalDismissed}>
                <div className="announcementContainer ms-Fabric">
                    <IconButton
                        className="announcementCloseButton"
                        iconProps={{ iconName: 'ChromeClose' }}
                        onClick={this.onModalDismissed}
                    />
                    <div className="announcementHeader">
                        <Icon
                            iconName="MegaphoneSolid"
                            className="announcementHeaderIcon"
                        />
                        <span>shortfuts</span>
                        <Icon
                            iconName="MegaphoneSolid"
                            className="announcementHeaderIconRight"
                        />
                    </div>
                    <div className="announcementBody">
                        <div className="announcementBullet">
                            <Icon
                                iconName="RadioBullet"
                                className="announcementBulletIcon"
                            />
                            <div className="announcementMessage">
                                <Link
                                    id="announcementSetShortcuts"
                                    onClick={() => {
                                        window.open(
                                            'https://www.paypal.me/martellaj/5',
                                            '_blank'
                                        );
                                    }}
                                >
                                    We've updated our privacy policy!
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Footer showChangeShortfutsButton={false} />
                </div>
            </Modal>
        );
    }

    private onModalDismissed = () => {
        this.isOpen = false;
    };
}
