import { log } from './utils/logger';

(function() {
    log('Running contentScript...');

    function logHotkeyReceived(hotkeyName: string) {
        log(`${hotkeyName} shortfut received in content script.`);
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        chrome.storage.sync.get('isActive', data => {
            const isActive = data.isActive;

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
            } else if (request.storeInClub) {
                logHotkeyReceived('storeInClub');
            } else if (request.buyNow) {
                logHotkeyReceived('buyNow');
            } else if (request.comparePrice) {
                logHotkeyReceived('comparePrice');
            } else if (request.quickSell) {
                logHotkeyReceived('quickSell');
            } else if (request.sendToTransferList) {
                logHotkeyReceived('sendToTransferList');
            } else if (request.listMinBin) {
                logHotkeyReceived('listMinBin');
            } else if (request.list) {
                logHotkeyReceived('list');
            } else if (request.buyBronzePack) {
                logHotkeyReceived('buyBronzePack');
            }
        });
    });
})();
