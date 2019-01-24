import * as React from "react";
import EditShortcuts from "../shortcuts/EditShortcuts";
import Header from "./Header";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "./Popup.scss";

@observer
export default class Popup extends React.Component<{}, {}> {
    @observable private isNativeShortcuts = true;
    @observable private isPremium = false;

    componentWillMount() {
        chrome.storage.sync.get("isNativeShortcuts", data => {
            if (
                data.isNativeShortcuts ||
                data.isNativeShortcuts === undefined
            ) {
                this.isNativeShortcuts = true;
            } else {
                this.isNativeShortcuts = false;
            }
        });

        chrome.storage.sync.get("isPremium", data => {
            this.isPremium = data.isPremium;
        });
    }

    render() {
        // buy.js
        (function() {
            var f = this,
                g = function(a, d) {
                    var c = a.split("."),
                        b = window || f;
                    c[0] in b || !b.execScript || b.execScript("var " + c[0]);
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

        return (
            <div className="popupContainer ms-Fabric">
                <Header />
                <EditShortcuts />
                {!this.isPremium && (
                    <button
                        onClick={() => {
                            (window as any).google.payments.inapp.buy({
                                parameters: { env: "prod" },
                                sku: "disable_safety_settings",
                                success: (response: any) => {
                                    // Determine if user is premium by checking purchases.
                                    (window as any).google.payments.inapp.getPurchases(
                                        {
                                            parameters: { env: "prod" },
                                            success: (response: any) => {
                                                const purchase =
                                                    response.response
                                                        .details[0];

                                                if (purchase) {
                                                    const isPremium =
                                                        purchase &&
                                                        purchase.state ===
                                                            "ACTIVE";
                                                    chrome.storage.sync.set({
                                                        isPremium: isPremium
                                                    });
                                                } else {
                                                    chrome.storage.sync.set({
                                                        isPremium: false
                                                    });
                                                }
                                            },
                                            failure: (response: any) => {}
                                        }
                                    );
                                },
                                failure: (response: any) => {
                                    chrome.storage.sync.set({
                                        isPremium: false
                                    });
                                }
                            });
                        }}
                    >
                        not premium
                    </button>
                )}
                {this.isPremium && "is premium"}
            </div>
        );
    }
}
