// Google Analytics bootstrap
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-108017342-2']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

chrome.browserAction.setBadgeBackgroundColor({
    color: '#0078d4',
});
chrome.browserAction.setBadgeText({
    text: 'ON',
});

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.contactDeveloper) {
        contactDeveloper();
    } else if (request.review) {
        review();
    } else if (request.makeBid) {
        _gaq.push(['_trackEvent', 'telemetry', 'makeBid']);
    } else if (request.buyNow) {
        _gaq.push(['_trackEvent', 'telemetry', 'buyNow']);
    } else if (request.buyBronzePack) {
        _gaq.push(['_trackEvent', 'telemetry', 'buyBronzePack']);
    } else if (request.comparePrice) {
        _gaq.push(['_trackEvent', 'telemetry', 'comparePrice']);
    } else if (request.decreaseMaxBidPrice) {
        _gaq.push(['_trackEvent', 'telemetry', 'decreaseMaxBidPrice']);
    } else if (request.decreaseMinBidPrice) {
        _gaq.push(['_trackEvent', 'telemetry', 'decreaseMinBidPrice']);
    } else if (request.increaseMaxBidPrice) {
        _gaq.push(['_trackEvent', 'telemetry', 'increaseMaxBidPrice']);
    } else if (request.increaseMinBidPrice) {
        _gaq.push(['_trackEvent', 'telemetry', 'increaseMinBidPrice']);
    } else if (request.listMinBin) {
        _gaq.push(['_trackEvent', 'telemetry', 'listMinBin']);
    } else if (request.list) {
        _gaq.push(['_trackEvent', 'telemetry', 'list']);
    } else if (request.quickSellAll) {
        _gaq.push(['_trackEvent', 'telemetry', 'quickSellAll']);
    } else if (request.quickSell) {
        _gaq.push(['_trackEvent', 'telemetry', 'quickSell']);
    } else if (request.search) {
        _gaq.push(['_trackEvent', 'telemetry', 'search']);
    } else if (request.storeAllInClub) {
        _gaq.push(['_trackEvent', 'telemetry', 'storeAllInClub']);
    } else if (request.storeInClub) {
        _gaq.push(['_trackEvent', 'telemetry', 'storeInClub']);
    } else if (request.watch) {
        _gaq.push(['_trackEvent', 'telemetry', 'watch']);
    } else if (request.sendToTransferList) {
        _gaq.push(['_trackEvent', 'telemetry', 'sendToTransferList']);
    }

    return isResponseAsync;
});

/**
 * This function hits the mailto protocol and returns user to current tab.
 */
function contactDeveloper() {
    chrome.tabs.query(
        {
            active: true,
        },
        tabs => {
            // Caches current user tab so we can return to it.
            const currentTabId = tabs[0].id;

            chrome.tabs.create(
                {
                    active: true,
                    url: 'mailto:shortfuts@gmail.com?subject=shortfuts%20feedback',
                },
                mailToTab => {
                    setTimeout(function() {
                        // Closes tab created by mailto protocol.
                        chrome.tabs.remove(mailToTab.id);

                        // Makes previously focused tab selected.
                        chrome.tabs.update(currentTabId, {
                            highlighted: true,
                        });
                    }, 150);
                }
            );
        }
    );
}

/**
 * Opens Chrome Web Store page so user can review.
 */
function review() {
    chrome.tabs.create({
        active: true,
        url: 'https://chrome.google.com/webstore/detail/shortfuts/piepdojghinggmddebidfkhfbdaggnmh',
    });
}
