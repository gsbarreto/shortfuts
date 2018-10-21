import * as React from 'react';
import Shortcut from './Shortcut';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ITextField, TextField } from 'office-ui-fabric-react/lib/TextField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './EditShortcuts.scss';

interface EditShortcutsState {
  isReady: boolean; // Don't render until shortcuts map loads.
  bidShortcut: string;
  binShortcut: string;
  buyBronzePackShortcut: string;
  compareShortcut: string;
  decreaseMaxShortcut: string;
  decreaseMinShortcut: string;
  increaseMaxShortcut: string;
  increaseMinShortcut: string;
  listMinBinShortcut: string;
  listShortcut: string;
  quickSellAllShortcut: string;
  quickSellShortcut: string;
  searchShortcut: string;
  storeAllShortcut: string;
}

@observer
export default class EditShortcuts extends React.Component<
  {},
  EditShortcutsState
> {
  private usedShortcuts: {} = {};

  private bidTextField: ITextField;
  private binTextField: ITextField;
  private buyBronzePackTextField: ITextField;
  private compareTextField: ITextField;
  private decreaseMaxTextField: ITextField;
  private decreaseMinTextField: ITextField;
  private increaseMaxTextField: ITextField;
  private increaseMinTextField: ITextField;
  private listMinBinTextField: ITextField;
  private listTextField: ITextField;
  private quickSellAllTextField: ITextField;
  private quickSellTextField: ITextField;
  private searchTextField: ITextField;
  private storeAllTextField: ITextField;

  @observable
  private hasError = false;

  constructor(props, state) {
    super(props, state);

    this.state = {
      isReady: false,
      bidShortcut: "",
      binShortcut: "",
      buyBronzePackShortcut: "",
      compareShortcut: "",
      decreaseMaxShortcut: "",
      decreaseMinShortcut: "",
      increaseMaxShortcut: "",
      increaseMinShortcut: "",
      listMinBinShortcut: "",
      listShortcut: "",
      quickSellAllShortcut: "",
      quickSellShortcut: "",
      searchShortcut: "",
      storeAllShortcut: ""
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

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Decrease min bid price</span>
          <TextField
            data-shortcut={Shortcut.DECREASE_MIN}
            componentRef={ref => (this.decreaseMinTextField = ref)}
            value={this.state.decreaseMinShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                decreaseMinShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Increase max bid price</span>
          <TextField
            data-shortcut={Shortcut.INCREASE_MAX}
            componentRef={ref => (this.increaseMaxTextField = ref)}
            value={this.state.increaseMaxShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                increaseMaxShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Increase min bid price</span>
          <TextField
            data-shortcut={Shortcut.INCREASE_MIN}
            componentRef={ref => (this.increaseMinTextField = ref)}
            value={this.state.increaseMinShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                increaseMinShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>List item for min BIN</span>
          <TextField
            data-shortcut={Shortcut.LIST_MIN_BIN}
            componentRef={ref => (this.listMinBinTextField = ref)}
            value={this.state.listMinBinShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                listMinBinShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>List item</span>
          <TextField
            data-shortcut={Shortcut.LIST}
            componentRef={ref => (this.listTextField = ref)}
            value={this.state.listShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                listShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Quick sell all</span>
          <TextField
            data-shortcut={Shortcut.QUICK_SELL_ALL}
            componentRef={ref => (this.quickSellAllTextField = ref)}
            value={this.state.quickSellAllShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                quickSellAllShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Quick sell</span>
          <TextField
            data-shortcut={Shortcut.QUICK_SELL}
            componentRef={ref => (this.quickSellTextField = ref)}
            value={this.state.quickSellShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                quickSellShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Search</span>
          <TextField
            data-shortcut={Shortcut.SEARCH}
            componentRef={ref => (this.searchTextField = ref)}
            value={this.state.searchShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                searchShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut ms-borderColor-themePrimary">
          <span>Store all</span>
          <TextField
            data-shortcut={Shortcut.STORE_ALL}
            componentRef={ref => (this.storeAllTextField = ref)}
            value={this.state.storeAllShortcut}
            underlined={true}
            onChanged={(value: string) => {
              this.setState({
                storeAllShortcut: value.toUpperCase()
              });
            }}
          />
        </div>

        <div className="editShortcutsShortcut editShortcutsNavigationShortcut ms-borderColor-themePrimary">
          <span>Go back</span>
          <span>Backspace</span>
        </div>

        <div className="editShortcutsShortcut editShortcutsNavigationShortcut ms-borderColor-themePrimary">
          <span>Select previous item</span>
          <span>Up arrow</span>
        </div>

        <div className="editShortcutsShortcut editShortcutsNavigationShortcut ms-borderColor-themePrimary">
          <span>Selext next item</span>
          <span>Down arrow</span>
        </div>

        <div className="editShortcutsShortcut editShortcutsNavigationShortcut ms-borderColor-themePrimary">
          <span>Go to previous page of items</span>
          <span>Left arrow</span>
        </div>

        <div className="editShortcutsShortcut editShortcutsNavigationShortcut ms-borderColor-themePrimary">
          <span>Go to next page of items</span>
          <span>Right arrow</span>
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

    // Validate "Decrease min bid" shortcut.
    if (
      this.decreaseMinTextField.value &&
      !this.validateShortcut(this.decreaseMinTextField.value)
    ) {
      return false;
    }

    // Validate "Increase max bid" shortcut.
    if (
      this.increaseMaxTextField.value &&
      !this.validateShortcut(this.increaseMaxTextField.value)
    ) {
      return false;
    }

    // Validate "Increase min bid" shortcut.
    if (
      this.increaseMinTextField.value &&
      !this.validateShortcut(this.increaseMinTextField.value)
    ) {
      return false;
    }

    // Validate "List min BIN" shortcut.
    if (
      this.listMinBinTextField.value &&
      !this.validateShortcut(this.listMinBinTextField.value)
    ) {
      return false;
    }

    // Validate "List" shortcut.
    if (
      this.listTextField.value &&
      !this.validateShortcut(this.listTextField.value)
    ) {
      return false;
    }

    // Validate "Quick sell all" shortcut.
    if (
      this.quickSellAllTextField.value &&
      !this.validateShortcut(this.quickSellAllTextField.value)
    ) {
      return false;
    }

    // Validate "Quick sell" shortcut.
    if (
      this.quickSellTextField.value &&
      !this.validateShortcut(this.quickSellTextField.value)
    ) {
      return false;
    }

    // Validate "Search" shortcut.
    if (
      this.searchTextField.value &&
      !this.validateShortcut(this.searchTextField.value)
    ) {
      return false;
    }

    // Validate "Store all" shortcut.
    if (
      this.storeAllTextField.value &&
      !this.validateShortcut(this.storeAllTextField.value)
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
    const bidEntry = this.getShortcutEntry(this.bidTextField);
    const binEntry = this.getShortcutEntry(this.binTextField);
    const buyBronzePackEntry = this.getShortcutEntry(
      this.buyBronzePackTextField
    );
    const compareEntry = this.getShortcutEntry(this.compareTextField);
    const decreaseMaxEntry = this.getShortcutEntry(this.decreaseMaxTextField);
    const decreaseMinEntry = this.getShortcutEntry(this.decreaseMinTextField);
    const increaseMaxEntry = this.getShortcutEntry(this.increaseMaxTextField);
    const increaseMinEntry = this.getShortcutEntry(this.increaseMinTextField);
    const listMinBinEntry = this.getShortcutEntry(this.listMinBinTextField);
    const listEntry = this.getShortcutEntry(this.listTextField);
    const quickSellAllEntry = this.getShortcutEntry(this.quickSellAllTextField);
    const quickSellEntry = this.getShortcutEntry(this.quickSellTextField);
    const searchEntry = this.getShortcutEntry(this.searchTextField);
    const storeAllEntry = this.getShortcutEntry(this.storeAllTextField);

    // Add all entries to shortcuts map.
    shortcutsMap[bidEntry.key] = bidEntry.shortcut;
    shortcutsMap[binEntry.key] = binEntry.shortcut;
    shortcutsMap[buyBronzePackEntry.key] = buyBronzePackEntry.shortcut;
    shortcutsMap[compareEntry.key] = compareEntry.shortcut;
    shortcutsMap[decreaseMaxEntry.key] = decreaseMaxEntry.shortcut;
    shortcutsMap[decreaseMinEntry.key] = decreaseMinEntry.shortcut;
    shortcutsMap[increaseMaxEntry.key] = increaseMaxEntry.shortcut;
    shortcutsMap[increaseMinEntry.key] = increaseMinEntry.shortcut;
    shortcutsMap[listMinBinEntry.key] = listMinBinEntry.shortcut;
    shortcutsMap[listEntry.key] = listEntry.shortcut;
    shortcutsMap[quickSellAllEntry.key] = quickSellAllEntry.shortcut;
    shortcutsMap[quickSellEntry.key] = quickSellEntry.shortcut;
    shortcutsMap[searchEntry.key] = searchEntry.shortcut;
    shortcutsMap[storeAllEntry.key] = storeAllEntry.shortcut;

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

      // TODO: Make the default shortcuts the same as legacy shortcuts.
      const defaultShortcuts = {
        bidShortcut: "",
        binShortcut: "",
        buyBronzePackShortcut: "",
        compareShortcut: "",
        decreaseMaxShortcut: "",
        decreaseMinShortcut: "",
        increaseMaxShortcut: "",
        increaseMinShortcut: "",
        listMinBinShortcut: "",
        listShortcut: "",
        quickSellAllShortcut: "",
        quickSellShortcut: "",
        searchShortcut: "",
        storeAllShortcut: ""
      };

      if (shortcutsMap) {
        for (const keyCode in shortcutsMap) {
          const shortcut = shortcutsMap[keyCode];

          switch (shortcut) {
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
            case Shortcut.DECREASE_MIN:
              defaultShortcuts.decreaseMinShortcut = keyCode;
              break;
            case Shortcut.INCREASE_MAX:
              defaultShortcuts.increaseMaxShortcut = keyCode;
              break;
            case Shortcut.INCREASE_MIN:
              defaultShortcuts.increaseMinShortcut = keyCode;
              break;
            case Shortcut.LIST_MIN_BIN:
              defaultShortcuts.listMinBinShortcut = keyCode;
              break;
            case Shortcut.LIST:
              defaultShortcuts.listShortcut = keyCode;
              break;
            case Shortcut.QUICK_SELL_ALL:
              defaultShortcuts.quickSellAllShortcut = keyCode;
              break;
            case Shortcut.QUICK_SELL:
              defaultShortcuts.quickSellShortcut = keyCode;
              break;
            case Shortcut.SEARCH:
              defaultShortcuts.searchShortcut = keyCode;
              break;
            case Shortcut.STORE_ALL:
              defaultShortcuts.storeAllShortcut = keyCode;
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
