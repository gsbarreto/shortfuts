import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import './Footer.scss';

export default class Footer extends React.Component<{}, {}> {
  render() {
    return (
      <div className="footer ms-bgColor-themeLighterAlt">
        {/* Review button */}
        <ActionButton
          iconProps={{ iconName: "FavoriteStarFill" }}
          onClick={() => {
            chrome.runtime.sendMessage({
              review: true
            });
          }}
        >
          Review
        </ActionButton>

        {/* Contact button */}
        <ActionButton
          iconProps={{ iconName: "Mail" }}
          onClick={() => {
            chrome.runtime.sendMessage({
              contactDeveloper: true
            });
          }}
        >
          Contact developer
        </ActionButton>
      </div>
    );
  }
}
