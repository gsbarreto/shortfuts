import getProvider from './providers/getProvider';
import Provider from './providers/Provider';
import { log } from './utils/logger';

(function() {
    log('Content script has loaded and is running.');

    // Update badge with current status.
    chrome.storage.sync.get('isActive', data => {
        // Make extension active on first run.
        if (data.isActive === undefined) {
            chrome.storage.sync.set({ isActive: true }, () => {
                chrome.runtime.sendMessage({ isActive: true });
            });
            return;
        }

        chrome.runtime.sendMessage({ isActive: data.isActive });
    });

    // Get provider that performs hotkey actions for correct version of web app.
    const provider = getProvider();

    // Sets up listeners for non-configurable shortcuts.
    window.addEventListener('keydown', ev => {
        const keyCode = ev.keyCode;

        chrome.storage.sync.get('isActive', data => {
            // Update badge with current status.
            const isActive = data.isActive;
            chrome.runtime.sendMessage({ isActive: isActive });

            // If extension "isn't active", don't handle any commands.
            if (!isActive) {
                log('Extension is currently not active, so ignoring hotkey.');
                return;
            }

            switch (keyCode) {
                case 8 /* backspace */:
                    provider.back();
                    break;
                case 38 /* up arrow */:
                    provider.move('up');
                    break;
                case 40 /* down arrow */:
                    provider.move('down');
                    break;
            }
        });
    });

    // Sets up listeners for configurable shortcuts.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        chrome.storage.sync.get('isActive', data => {
            const isActive = data.isActive;
            chrome.runtime.sendMessage({ isActive: isActive });

            /**
             * This shortcut is checked prior to checking if extension "is active"
             * because this one always gets handled.
             */
            if (request.toggleExtension) {
                logHotkeyReceived('toggleExtension');

                chrome.storage.sync.set({ isActive: !isActive }, () => {
                    log(
                        `Extension is now ${!isActive ? 'active' : 'inactive'}.`
                    );
                    chrome.runtime.sendMessage({ isActive: !isActive });
                });

                // Hotkey handled, so return.
                return;
            }

            // If extension "isn't active", don't handle any commands.
            if (!isActive) {
                log('Extension is currently not active, so ignoring hotkey.');
                return;
            }

            if (request.futbin) {
                logHotkeyReceived('futbin');
                provider.futbin();
            } else if (request.storeInClub) {
                logHotkeyReceived('storeInClub');
                provider.storeInClub();
            } else if (request.buyNow) {
                logHotkeyReceived('buyNow');
                provider.buyNow();
            } else if (request.comparePrice) {
                logHotkeyReceived('comparePrice');
                provider.comparePrice();
            } else if (request.quickSell) {
                logHotkeyReceived('quickSell');
                provider.quickSell();
            } else if (request.sendToTransferList) {
                logHotkeyReceived('sendToTransferList');
                provider.sendToTransferList();
            } else if (request.listMinBin) {
                logHotkeyReceived('listMinBin');
                provider.listMinBin();
            } else if (request.list) {
                logHotkeyReceived('list');
                provider.list();
            } else if (request.buyBronzePack) {
                logHotkeyReceived('buyBronzePack');
                provider.buyBronzePack();
            } else if (request.quickSellAll) {
                logHotkeyReceived('quickSellAll');
                provider.quickSellAll();
            }
        });
    });

    function logHotkeyReceived(hotkeyName: string) {
        log(`${hotkeyName} shortfut received in content script.`);
    }
})();
