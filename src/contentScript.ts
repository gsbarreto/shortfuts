import getProvider from './providers/getProvider';
import Provider from './providers/Provider';
import { log } from './utils/logger';

(function() {
    log('Content script has loaded and is running.');

    // Get provider that performs hotkey actions for correct version of web app.
    const provider = getProvider();

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
            }
        });
    });

    function logHotkeyReceived(hotkeyName: string) {
        log(`${hotkeyName} shortfut received in content script`);
    }
})();
