import { log } from './utils/logger';

(function() {
    log('Running contentScript...');

    function logHotkeyReceived(hotkeyName: string) {
        log(`${hotkeyName} received in content script!`);
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.toggleExtension) {
            logHotkeyReceived('toggleExtension');
        } else if (request.futbin) {
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
})();
