import * as React from 'react';
import Footer from './popup/Footer';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Announcement.scss';

const ANNOUNCEMENT_VERSION = 10;

@observer
export default class Announcement extends React.Component<{}, {}> {
  @observable
  private isOpen: boolean = false;

  private message: string = `Your language isn't supported yet. Please email shortfuts@gmail.com with the language you'd like to see supported!`;
  private message2: string = "";

  componentDidMount() {
    const appLanguage = document.getElementsByTagName("html")[0].lang;
    if (
      appLanguage &&
      !(
        appLanguage.toLowerCase() === "en" ||
        appLanguage.toLowerCase() === "fr" ||
        appLanguage.toLowerCase() === "it" ||
        appLanguage.toLowerCase() === "de"
      )
    ) {
      this.isOpen = true;
      return;
    } else {
      this.message = `Welcome to shortfuts v5.0! This is an exciting, long requested update where you will now be able to assign custom, 1 character hotkeys to all shortcuts! Open the extension's popup to customize your shortcuts!`;

      this.message2 = `If you are enjoying shortfuts, please take 2 seconds to leave a review in the Chrome Web Store. Your support really means a lot. Thank you!`;
    }

    chrome.storage.sync.get("announcementVersion", data => {
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
        <div className="announcementContainer ms-Fabric ms-borderColor-themePrimary ms-fontColor-themePrimary">
          <div className="announcementHeader">shortfuts</div>
          <div className="announcementBody">
            <div className="announcementBullet">
              <div className="announcementMessage">{this.message}</div>
              {this.message2 && (
                <div
                  className="announcementMessage"
                  style={{ marginTop: "12px" }}
                >
                  {this.message2}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </Modal>
    );
  }

  private onModalDismissed = () => {
    this.isOpen = false;
  };
}
