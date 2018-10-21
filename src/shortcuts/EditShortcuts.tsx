import * as React from 'react';
import Shortcut from './Shortcut';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ITextField, TextField } from 'office-ui-fabric-react/lib/TextField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './EditShortcuts.scss';

interface EditShortcutsState {
  isReady: boolean; // Don't render until shortcuts map loads.
  backShortcut: string;
  bidShortcut: string;
  binShortcut: string;
  buyBronzePackShortcut: string;
  compareShortcut: string;
  decreaseMaxShortcut: string;
}

@observer
export default class EditShortcuts extends React.Component<
  {},
  EditShortcutsState
> {
  private usedShortcuts: {} = {};

  private backTextField: ITextField;
  private bidTextField: ITextField;
  private binTextField: ITextField;
  private buyBronzePackTextField: ITextField;
  private compareTextField: ITextField;
  private decreaseMaxTextField: ITextField;

  @observable
  private hasError = false;

  constructor(props, state) {
    super(props, state);

    this.state = {
      isReady: false,
      backShortcut: "",
      bidShortcut: "",
      binShortcut: "",
      buyBronzePackShortcut: "",
      compareShortcut: "",
      decreaseMaxShortcut: ""
    };
  }

  componentWillMount() {
    this.setShortcutsFromStorage();
  }

  render() {
    // Don't render if we don't have shortcuts data.
    if (!this.state.isReady) {
      return null;
    }

    return (
      <div className="editShortcutsContainer ms-Fabric">
        <div className="editShortcutsButtons">
          <PrimaryButton
            onClick={this.onSaveShortcutsClicked}
            style={{ marginRight: "12px" }}
          >
            Save
          </PrimaryButton>
          <DefaultButton
            onClick={() => this.setShortcutsFromStorage()}
            title="Discards any unsaved changes"
          >
            Discard
          </DefaultButton>
        </div>

        {this.hasError && (
          <div className="editShortcutsError ms-fontColor-redDark">
            All shortcuts must be a single, unique character between A-Z and
            0-9.
          </div>
        )}

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Go back</span>
          <TextField
            data-shortcut={Shortcut.BACK}
            componentRef={ref => (this.backTextField = ref)}
            value={this.state.backShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                backShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Bid on card</span>
          <TextField
            data-shortcut={Shortcut.BID}
            componentRef={ref => (this.bidTextField = ref)}
            value={this.state.bidShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                bidShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Buy it now (BIN)</span>
          <TextField
            data-shortcut={Shortcut.BIN}
            componentRef={ref => (this.binTextField = ref)}
            value={this.state.binShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                binShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Buy bronze pack</span>
          <TextField
            data-shortcut={Shortcut.BRONZE_PACK}
            componentRef={ref => (this.buyBronzePackTextField = ref)}
            value={this.state.buyBronzePackShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                buyBronzePackShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Compare price</span>
          <TextField
            data-shortcut={Shortcut.COMPARE}
            componentRef={ref => (this.compareTextField = ref)}
            value={this.state.compareShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                compareShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Decrease max bid price</span>
          <TextField
            data-shortcut={Shortcut.DECREASE_MAX}
            componentRef={ref => (this.decreaseMaxTextField = ref)}
            value={this.state.decreaseMaxShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                decreaseMaxShortcut: value.toUpperCase()
              });
            }}
          />
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
    // Clear used shortcuts map (from last validation).
    this.usedShortcuts = {};

    // Validate "Back" shortcut.
    if (
      this.backTextField.value &&
      !this.validateShortcut(this.backTextField.value)
    ) {
      return false;
    }

    // Validate "Bid" shortcut.
    if (
      this.bidTextField.value &&
      !this.validateShortcut(this.bidTextField.value)
    ) {
      return false;
    }

    // Validate "Buy it now" shortcut.
    if (
      this.binTextField.value &&
      !this.validateShortcut(this.binTextField.value)
    ) {
      return false;
    }

    // Validate "Buy bronze pack" shortcut.
    if (
      this.buyBronzePackTextField.value &&
      !this.validateShortcut(this.buyBronzePackTextField.value)
    ) {
      return false;
    }

    // Validate "Compare" shortcut.
    if (
      this.compareTextField.value &&
      !this.validateShortcut(this.compareTextField.value)
    ) {
      return false;
    }

    // Validate "Decrease max bid" shortcut.
    if (
      this.decreaseMaxTextField.value &&
      !this.validateShortcut(this.decreaseMaxTextField.value)
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

    // Shortcut has to be a-z, A-Z, or 0-9.
    if (!shortcut.match(/[a-zA-Z0-9]/)) {
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
    const binEntry = this.getShortcutEntry(this.binTextField);
    const buyBronzePackEntry = this.getShortcutEntry(
      this.buyBronzePackTextField
    );
    const compareEntry = this.getShortcutEntry(this.compareTextField);
    const decreaseMaxEntry = this.getShortcutEntry(this.decreaseMaxTextField);

    // Add all entries to shortcuts map.
    shortcutsMap[backEntry.key] = backEntry.shortcut;
    shortcutsMap[bidEntry.key] = bidEntry.shortcut;
    shortcutsMap[binEntry.key] = binEntry.shortcut;
    shortcutsMap[buyBronzePackEntry.key] = buyBronzePackEntry.shortcut;
    shortcutsMap[compareEntry.key] = compareEntry.shortcut;
    shortcutsMap[decreaseMaxEntry.key] = decreaseMaxEntry.shortcut;

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
      shortcut: textField.props["data-shortcut"]
    };
  };

  private setShortcutsFromStorage = () => {
    chrome.storage.sync.get("shortcutsMap", data => {
      const shortcutsMap = data.shortcutsMap;

      // TODO: Decide if we want default shortcuts.
      const defaultShortcuts = {
        backShortcut: "",
        bidShortcut: "",
        binShortcut: "",
        buyBronzePackShortcut: "",
        compareShortcut: "",
        decreaseMaxShortcut: ""
      };

      if (shortcutsMap) {
        for (const keyCode in shortcutsMap) {
          const shortcut = shortcutsMap[keyCode];

          switch (shortcut) {
            case Shortcut.BACK:
              defaultShortcuts.backShortcut = keyCode;
              break;
            case Shortcut.BID:
              defaultShortcuts.bidShortcut = keyCode;
              break;
            case Shortcut.BIN:
              defaultShortcuts.binShortcut = keyCode;
              break;
            case Shortcut.BRONZE_PACK:
              defaultShortcuts.buyBronzePackShortcut = keyCode;
              break;
            case Shortcut.COMPARE:
              defaultShortcuts.compareShortcut = keyCode;
              break;
            case Shortcut.DECREASE_MAX:
              defaultShortcuts.decreaseMaxShortcut = keyCode;
              break;
          }
        }
      }

      this.setState({
        isReady: true,
        ...defaultShortcuts
      });
    });
  };
}
