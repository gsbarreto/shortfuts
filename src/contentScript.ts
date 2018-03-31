import { log } from './utils/logger';

(function() {
    log('Running contentScript...');

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.buyNow) {
            log('buyNow hotkey fired!');
        }
    });
})();
