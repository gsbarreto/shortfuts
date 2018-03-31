import { log } from './utils/logger';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        log('eventPage notified that Popup.tsx has mounted.');
    }

    return isResponseAsync;
});

// Listens for hotkeys to be pressed and notifies content script.
chrome.commands.onCommand.addListener(command => {
    log(`Command: ${command}`);

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0].id;

        switch (command) {
            case 'buyNow': {
                chrome.tabs.sendMessage(currentTab, { buyNow: true });
                break;
            }
        }
    });
});
