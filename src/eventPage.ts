// Google Analytics bootstrap
(function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
        i[r] ||
        function() {
            (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * Number(new Date()));
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
);

// @ts-ignore
ga("create", "UA-108017342-2", "auto");
// @ts-ignore
ga("set", "checkProtocolTask", function() {});
// @ts-ignore
ga("send", "pageview");

chrome.browserAction.setBadgeBackgroundColor({
    color: "#0078d4"
});
chrome.browserAction.setBadgeText({
    text: "ON"
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
        trackEvent("makeBid");
    } else if (request.buyNow) {
        trackEvent("buyNow");
    } else if (request.buyBronzePack) {
        trackEvent("buyBronzePack");
    } else if (request.comparePrice) {
        trackEvent("comparePrice");
    } else if (request.decreaseMaxBidPrice) {
        trackEvent("decreaseMaxBidPrice");
    } else if (request.decreaseMinBidPrice) {
        trackEvent("decreaseMinBidPrice");
    } else if (request.increaseMaxBidPrice) {
        trackEvent("increaseMaxBidPrice");
    } else if (request.increaseMinBidPrice) {
        trackEvent("increaseMinBidPrice");
    } else if (request.listMinBin) {
        trackEvent("listMinBin");
    } else if (request.list) {
        trackEvent("list");
    } else if (request.quickSellAll) {
        trackEvent("quickSellAll");
    } else if (request.quickSell) {
        trackEvent("quickSell");
    } else if (request.search) {
        trackEvent("search");

        // Increment count of searches. Value is checked in Announcement component.
        chrome.storage.sync.get("antiBan", data => {
            const count = data.antiBan;

            // If count is -1, user doesn't care to be warned so don't need to count.
            if (count === -1) {
                return;
            }

            // Initialize count if it doesn't exist, or increment if it does.
            let newCount;
            if (!count) {
                newCount = 1;
            } else {
                newCount = count + 1;
            }

            // Set the count.
            chrome.storage.sync.set({
                antiBan: newCount
            });
        });
    } else if (request.storeAllInClub) {
        trackEvent("storeAllInClub");
    } else if (request.storeInClub) {
        trackEvent("storeInClub");
    } else if (request.watch) {
        trackEvent("watch");
    } else if (request.sendToTransferList) {
        trackEvent("sendToTransferList");
    } else if (request.warningDismissed) {
        trackEvent("warningDismissed");
    }

    return isResponseAsync;
});

/**
 * This function hits the mailto protocol and returns user to current tab.
 */
function contactDeveloper() {
    chrome.tabs.query(
        {
            active: true
        },
        tabs => {
            // Caches current user tab so we can return to it.
            const currentTabId = tabs[0].id;

            chrome.tabs.create(
                {
                    active: true,
                    url:
                        "mailto:shortfuts@gmail.com?subject=shortfuts%20feedback"
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

/**
 * Opens Chrome Web Store page so user can review.
 */
function review() {
    chrome.tabs.create({
        active: true,
        url:
            "https://chrome.google.com/webstore/detail/shortfuts/piepdojghinggmddebidfkhfbdaggnmh"
    });
}

function trackEvent(eventName: string) {
    // @ts-ignore
    ga("send", {
        hitType: "event",
        eventCategory: "telemetry",
        eventAction: eventName
    });
}
