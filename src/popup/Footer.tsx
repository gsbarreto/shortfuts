import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import './Footer.scss';

export interface FooterProps {
  showChangeShortfutsButton: boolean;
}

export default class Footer extends React.Component<FooterProps, {}> {
  constructor(props: FooterProps, state: {}) {
    super(props, state);
  }

  render() {
    return (
      <div className="footer">
        {/* Change shortcuts button */}
        {this.props.showChangeShortfutsButton && (
          <ActionButton
            iconProps={{ iconName: "EditStyle" }}
            onClick={() => {
              chrome.runtime.sendMessage({
                changeShortcuts: true
              });
            }}
          >
            Change shortcuts
          </ActionButton>
        )}
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
