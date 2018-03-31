import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './Popup';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Popup />, document.getElementById('popup'));
});
