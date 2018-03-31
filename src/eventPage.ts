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
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTab = tabs[0].id;

        switch (command) {
            // toggleExtension
            case 'command0': {
                chrome.tabs.sendMessage(currentTab, { toggleExtension: true });
                break;
            }
            // futbin
            case 'command1': {
                chrome.tabs.sendMessage(currentTab, { futbin: true });
                break;
            }
            // storeInClub
            case 'command2': {
                chrome.tabs.sendMessage(currentTab, { storeInClub: true });
                break;
            }
            // buyNow
            case 'command3': {
                chrome.tabs.sendMessage(currentTab, { buyNow: true });
                break;
            }
            // comparePrice
            case 'command4': {
                chrome.tabs.sendMessage(currentTab, { comparePrice: true });
                break;
            }
            // quickSell
            case 'command5': {
                chrome.tabs.sendMessage(currentTab, { quickSell: true });
                break;
            }
            // sendToTransferList
            case 'command6': {
                chrome.tabs.sendMessage(currentTab, {
                    sendToTransferList: true
                });
                break;
            }
            // listMinBin
            case 'command7': {
                chrome.tabs.sendMessage(currentTab, {
                    listMinBin: true
                });
                break;
            }
            // list
            case 'command8': {
                chrome.tabs.sendMessage(currentTab, {
                    list: true
                });
                break;
            }
            // buyBronzePack
            case 'command9': {
                chrome.tabs.sendMessage(currentTab, {
                    buyBronzePack: true
                });
                break;
            }
        }
    });
});
