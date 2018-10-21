import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { observer } from 'mobx-react';
import './Header.scss';

@observer
export default class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div className="header ms-bgColor-themePrimary ms-fontColor-themeLighter">
        <span className="headerTitle">shortfuts</span>

        <div className="headerButtons">
          {/* Review button */}
          <ActionButton
            iconProps={{
              iconName: "FavoriteStarFill",
              style: {
                color: "white"
              }
            }}
            onClick={() => {
              window.open(
                "https://chrome.google.com/webstore/detail/shortfuts/piepdojghinggmddebidfkhfbdaggnmh",
                "_blank"
              );
            }}
            style={{
              color: "white"
            }}
          >
            Review
          </ActionButton>

          {/* Contact button */}
          <ActionButton
            iconProps={{
              iconName: "Mail",
              style: { color: "white" }
            }}
            onClick={() => {
              chrome.runtime.sendMessage({
                contactDeveloper: true
              });
            }}
            style={{
              color: "white"
            }}
          >
            Contact
          </ActionButton>
        </div>
      </div>
    );
  }
}
