// Google Analytics bootstrap
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-108017342-1"]);
var ga = document.createElement("script");
ga.type = "text/javascript";
ga.async = true;
ga.src = "https://ssl.google-analytics.com/ga.js";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(ga, s);

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.contactDeveloper) {
    contactDeveloper();
  } else if (request.review) {
    review();
  } else if (request.isActive !== undefined) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: "#0078d4"
    });
    chrome.browserAction.setBadgeText({
      text: request.isActive ? "ON" : "OFF"
    });
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
          url: "mailto:shortfuts@gmail.com?subject=shortfuts%20feedback"
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
