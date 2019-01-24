import clickBuyNowButton from "./helpers/clickBuyNowButton";
import confirmConfirmationDialog from "./helpers/confirmConfirmationDialog";
import isUserOnSearchResultsPage from "./helpers/isUserOnSearchResultsPage";
import { logError } from "../utils/logger";

export default function buyNow() {
    if (isUserOnSearchResultsPage()) {
        try {
            // buy.js
            (function() {
                var f = this,
                    g = function(a, d) {
                        var c = a.split("."),
                            b = window || f;
                        c[0] in b ||
                            !b.execScript ||
                            b.execScript("var " + c[0]);
                        for (var e; c.length && (e = c.shift()); )
                            c.length || void 0 === d
                                ? (b = b[e] ? b[e] : (b[e] = {}))
                                : (b[e] = d);
                    };
                var h = function(a) {
                    var d = chrome.runtime.connect(
                            "nmmhkkegccagdldgiimedpiccmgmieda",
                            {}
                        ),
                        c = !1;
                    d.onMessage.addListener(function(b: any) {
                        c = !0;
                        "response" in b && !("errorType" in b.response)
                            ? a.success && a.success(b)
                            : a.failure && a.failure(b);
                    });
                    d.onDisconnect.addListener(function() {
                        !c &&
                            a.failure &&
                            a.failure({
                                request: {},
                                response: { errorType: "INTERNAL_SERVER_ERROR" }
                            });
                    });
                    d.postMessage(a);
                };
                g("google.payments.inapp.buy", function(a) {
                    a.method = "buy";
                    h(a);
                });
                g("google.payments.inapp.consumePurchase", function(a) {
                    a.method = "consumePurchase";
                    h(a);
                });
                g("google.payments.inapp.getPurchases", function(a) {
                    a.method = "getPurchases";
                    h(a);
                });
                g("google.payments.inapp.getSkuDetails", function(a) {
                    a.method = "getSkuDetails";
                    h(a);
                });
            })();

            // Determine if user is premium by checking purchases.
            (window as any).google.payments.inapp.getPurchases({
                parameters: { env: "prod" },
                success: (response: any) => {
                    const purchase = response.response.details[0];
                    let isPremium = false;

                    if (purchase) {
                        isPremium = purchase && purchase.state === "ACTIVE";
                    }

                    chrome.storage.sync.get("buyNowDelay", (data: any) => {
                        const shouldWait =
                            data.buyNowDelay === undefined
                                ? true
                                : data.buyNowDelay;

                        if (!isPremium || shouldWait) {
                            setTimeout(() => {
                                clickBuyNowButton();
                                confirmConfirmationDialog();
                            }, wait());
                        } else {
                            clickBuyNowButton();
                            confirmConfirmationDialog();
                        }
                    });
                },
                failure: (response: any) => {
                    setTimeout(() => {
                        clickBuyNowButton();
                        confirmConfirmationDialog();
                    }, wait());
                }
            });
        } catch (error) {
            logError(`Oops! Couldn't "buy it now" for some reason...`);
        }
    }
}

function wait(): number {
    const min = 450;
    const max = 550;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
