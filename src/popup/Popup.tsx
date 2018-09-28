import * as React from 'react';
import EditShortcuts from '../shortcuts/EditShortcuts';
import Footer from './Footer';
import Header from './Header';
import ShortfutsList from './ShortfutsList';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Popup.scss';

@observer
export default class Popup extends React.Component<{}, {}> {
    @observable
    private isNativeShortcuts = true;

    componentWillMount() {
        chrome.storage.sync.get('isNativeShortcuts', data => {
            if (
                data.isNativeShortcuts ||
                data.isNativeShortcuts === undefined
            ) {
                this.isNativeShortcuts = true;
            } else {
                this.isNativeShortcuts = false;
            }
        });
    }

    render() {
        const isEditMode = true;

        return (
            <div className="popupContainer ms-Fabric">
                <Header
                    isNativeShortcuts={this.isNativeShortcuts}
                    onShortcutsModeToggled={this.onShortcutsModeToggled}
                />
                <EditShortcuts />
            </div>
        );
    }

    private onShortcutsModeToggled = (isNativeShortcuts: boolean) => {
        chrome.storage.sync.set(
            { isNativeShortcuts: isNativeShortcuts },
            () => {
                this.isNativeShortcuts = isNativeShortcuts;
            }
        );
    };
}
