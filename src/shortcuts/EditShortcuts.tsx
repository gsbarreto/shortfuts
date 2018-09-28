import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './EditShortcuts.scss';

@observer
export default class EditShortcuts extends React.Component<{}, {}> {
    // @observable private isNativeShortcuts = true;

    componentWillMount() {
        // chrome.storage.sync.get('isNativeShortcuts', data => {
        //     if (
        //         data.isNativeShortcuts ||
        //         data.isNativeShortcuts === undefined
        //     ) {
        //         this.isNativeShortcuts = true;
        //     } else {
        //         this.isNativeShortcuts = false;
        //     }
        // });
    }

    render() {
        return (
            <div className="editShortcutsContainer ms-Fabric">
                <TextField label="Go back (on any page)" />
                <TextField label="Bid on card" />
                <div className="editShortcutsButtons">
                    <PrimaryButton>Save</PrimaryButton>
                    <DefaultButton>Discard</DefaultButton>
                </div>
            </div>
        );
    }

    private onSaveShortcuts = () => {
        // chrome.storage.sync.set(
        //     { isNativeShortcuts: isNativeShortcuts },
        //     () => {
        //         this.isNativeShortcuts = isNativeShortcuts;
        //     }
        // );
    };
}
