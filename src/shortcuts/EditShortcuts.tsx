import * as React from 'react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ITextField, TextField } from 'office-ui-fabric-react/lib/TextField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './EditShortcuts.scss';

@observer
export default class EditShortcuts extends React.Component<{}, {}> {
    private usedShortcuts: {} = {};

    private backTextField: ITextField;
    private bidTextField: ITextField;

    @observable private hasError = false;

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
                <TextField label="Go back (on any page)" componentRef={ (ref) => this.backTextField = ref } />
                <TextField label="Bid on card" componentRef={ (ref) => this.bidTextField = ref } />
                { this.hasError && <div className="editShortcutsError">All shortcuts must be a single character and unique.</div> }
                <div className="editShortcutsButtons">
                    <PrimaryButton onClick={ this.onSaveShortcutsClicked } style={ { marginRight: '12px' } }>Save</PrimaryButton>
                    <DefaultButton>Discard</DefaultButton>
                </div>
            </div>
        );
    }

    private onSaveShortcutsClicked = () => {
        // chrome.storage.sync.set(
        //     { isNativeShortcuts: isNativeShortcuts },
        //     () => {
        //         this.isNativeShortcuts = isNativeShortcuts;
        //     }
        // );

        // Determine if there's an error (shortcuts are invalid).
        this.hasError = !this.validateShortcuts();

        // If there's an error, don't save shortcuts.
        if (this.hasError) {
            return;
        }
    };

    private validateShortcuts = (): boolean => {
        // Clear used shortcuts map (from last validation);
        this.usedShortcuts = {};

        if (this.backTextField.value && !this.validateShortcut(this.backTextField.value)) {
            return false;
        }

        if (this.bidTextField.value && !this.validateShortcut(this.bidTextField.value)) {
            return false;
        }

        // If nothing short-circuited, it means all shortcuts are valid.
        return true;
    }

    private validateShortcut = (shortcut: string): boolean => {
        // Shortcut has to be 1 character.
        if (shortcut.length !== 1) {
            return false;
        }

        // Shortcuts must be unique.
        if (this.usedShortcuts[shortcut]) {
            return false;
        }

        // Mark shortcut as used.
        this.usedShortcuts[shortcut] = true;

        // Shortcut is valid.
        return true;
    }
}
