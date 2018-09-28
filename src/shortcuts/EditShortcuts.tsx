import * as React from 'react';
import Shortcut from './Shortcut';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ITextField, TextField } from 'office-ui-fabric-react/lib/TextField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './EditShortcuts.scss';

interface EditShortcutsState {
    isReady: boolean; // Don't render until shortcuts map loads.
    backDefault: string;
    bidDefault: string;
}

@observer
export default class EditShortcuts extends React.Component<
    {},
    EditShortcutsState
> {
    private usedShortcuts: {} = {};

    private backTextField: ITextField;
    private bidTextField: ITextField;

    @observable
    private hasError = false;

    constructor(props, state) {
        super(props, state);

        this.state = {
            isReady: false,
            backDefault: '',
            bidDefault: ''
        };
    }

    componentWillMount() {
        chrome.storage.sync.get('shortcutsMap', data => {
            const shortcutsMap = data.shortcutsMap;

            if (shortcutsMap) {
                for (const keyCode in shortcutsMap) {
                    const shortcut = shortcutsMap[keyCode];

                    switch (shortcut) {
                        case Shortcut.BACK:
                            this.setState({
                                backDefault: keyCode
                            });
                            break;
                        case Shortcut.BID:
                            this.setState({
                                bidDefault: keyCode
                            });
                            break;
                    }
                }
            } else {
                // TODO: Set state to default keys.
            }

            this.setState({
                isReady: true
            });
        });
    }

    render() {
        // Don't render if we don't have shortcuts data.
        if (!this.state.isReady) {
            return null;
        }

        return (
            <div className="editShortcutsContainer ms-Fabric">
                <TextField
                    data-shortcut={Shortcut.BACK}
                    label="Go back (on any page)"
                    componentRef={ref => (this.backTextField = ref)}
                    defaultValue={this.state.backDefault}
                />
                <TextField
                    data-shortcut={Shortcut.BID}
                    label="Bid on card"
                    componentRef={ref => (this.bidTextField = ref)}
                    defaultValue={this.state.bidDefault}
                />
                {this.hasError && (
                    <div className="editShortcutsError">
                        All shortcuts must be a single character and unique.
                    </div>
                )}
                <div className="editShortcutsButtons">
                    <PrimaryButton
                        onClick={this.onSaveShortcutsClicked}
                        style={{ marginRight: '12px' }}
                    >
                        Save
                    </PrimaryButton>
                    <DefaultButton>Discard</DefaultButton>
                </div>
            </div>
        );
    }

    private onSaveShortcutsClicked = () => {
        // Determine if there's an error (shortcuts are invalid).
        this.hasError = !this.validateShortcuts();

        // If there's an error, don't save shortcuts.
        if (this.hasError) {
            return;
        }

        this.saveShortcuts();
    };

    private validateShortcuts = (): boolean => {
        // Clear used shortcuts map (from last validation);
        this.usedShortcuts = {};

        if (
            this.backTextField.value &&
            !this.validateShortcut(this.backTextField.value)
        ) {
            return false;
        }

        if (
            this.bidTextField.value &&
            !this.validateShortcut(this.bidTextField.value)
        ) {
            return false;
        }

        // If nothing short-circuited, it means all shortcuts are valid.
        return true;
    };

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
    };

    private saveShortcuts = () => {
        const shortcutsMap = {};

        // Get all entries to shortcuts map (1 per TextField).
        const backEntry = this.getShortcutEntry(this.backTextField);
        const bidEntry = this.getShortcutEntry(this.bidTextField);

        // Add all entries to shortcuts map.
        shortcutsMap[backEntry.key] = backEntry.shortcut;
        shortcutsMap[bidEntry.key] = bidEntry.shortcut;

        // Save shortcuts map to storage, and then close popup.
        chrome.storage.sync.set({ shortcutsMap: shortcutsMap }, () => {
            window.close();
        });
    };

    /**
     * Returns key-value pair for shortcuts map to be saved in storage. The key
     * is the key used to activate the shortcut. The value is an enum representing
     * what shortcut is being assigned.
     */
    private getShortcutEntry = (textField: any) => {
        return {
            key: textField.value,
            shortcut: textField.props['data-shortcut']
        };
    };
}
