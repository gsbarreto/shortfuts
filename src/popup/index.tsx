import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from './Popup';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { loadTheme } from '@uifabric/styling';

// Initialize OUFR icons.
initializeIcons();

// Replace OUFR default theme with FIFA 18 color theme.
loadTheme({
    palette: {
        themePrimary: '#201c55',
        themeLighterAlt: '#ebeaf8',
        themeLighter: '#ccc9ed',
        themeLight: '#827dd4',
        themeTertiary: '#3b349f',
        themeSecondary: '#242061',
        themeDarkAlt: '#1c194c',
        themeDark: '#141236',
        themeDarker: '#110f2e',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#a6a6a6',
        neutralSecondary: '#666666',
        neutralPrimaryAlt: '#3c3c3c',
        neutralPrimary: '#333',
        neutralDark: '#212121',
        black: '#1c1c1c',
        white: '#fff'
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Popup />, document.getElementById('popup'));
});
