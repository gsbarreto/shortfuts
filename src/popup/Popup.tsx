import * as React from 'react';
import EditShortcuts from '../shortcuts/EditShortcuts';
import Header from './Header';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Popup.scss';

@observer
export default class Popup extends React.Component<{}, {}> {
  @observable
  private isNativeShortcuts = true;

  componentWillMount() {
    chrome.storage.sync.get("isNativeShortcuts", data => {
      if (data.isNativeShortcuts || data.isNativeShortcuts === undefined) {
        this.isNativeShortcuts = true;
      } else {
        this.isNativeShortcuts = false;
      }
    });
  }

  render() {
    return (
      <div className="popupContainer ms-Fabric">
        <Header />
        <EditShortcuts />
      </div>
    );
  }
}
