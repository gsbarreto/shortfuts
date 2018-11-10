import * as React from 'react';
import Footer from './popup/Footer';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Announcement.scss';

const ANNOUNCEMENT_VERSION = 11;

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
        appLanguage.toLowerCase() === "de" ||
        appLanguage.toLowerCase() === "pl" ||
        appLanguage.toLowerCase() === "nl"
      )
    ) {
      this.isOpen = true;
      return;
    } else {
      this.message = `The most recent update added some EA detection prevention logic to make using shortfuts safer, as well as added support for multiple new languages (French, Italian, German, Polish, Dutch)!`;

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
