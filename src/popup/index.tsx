import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './Popup';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

// Initialize OUFR icons.
initializeIcons();

chrome.tabs.query({ active: true, currentWindow: true }, () => {
  ReactDOM.render(<Popup />, document.getElementById("popup"));
});
