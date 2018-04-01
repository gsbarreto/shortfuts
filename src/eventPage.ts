import { log } from './utils/logger';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.changeShortcuts) {
        chrome.tabs.create({
            active: true,
            url: 'chrome://extensions/shortcuts'
        });
    } else if (request.contactDeveloper) {
        contactDeveloper();
    } else if (request.isActive !== undefined) {
        chrome.browserAction.setBadgeBackgroundColor({
            color: '#201c55' /* themePrimaryColor */
        });
        chrome.browserAction.setBadgeText({
            text: request.isActive ? 'ON' : 'OFF'
        });
    }

    return isResponseAsync;
});

// This function hits the mailto protocol and returns user to current tab.
function contactDeveloper() {
    chrome.tabs.query(
        {
            active: true
        },
        tabs => {
            // Caches current user tab so we can returnto it.
            const currentTabId = tabs[0].id;

            chrome.tabs.create(
                {
                    active: true,
                    url:
                        'mailto:martellaj@live.com?subject=[shortfuts]%20Subject'
                },
                mailToTab => {
                    setTimeout(function() {
                        // Closes tab created by mailto protocol.
                        chrome.tabs.remove(mailToTab.id);

                        // Makes previously focused tab selected.
                        chrome.tabs.update(currentTabId, {
                            highlighted: true
                        });
                    }, 150);
                }
            );
        }
    );
}

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
