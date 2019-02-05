import * as React from "react";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

interface SafetySettingsState {
    buyNowDelay: boolean;
    frequentSearchWarning: boolean;
    isPremium: boolean;
}

export default class SafetySettings extends React.Component<
    {},
    SafetySettingsState
> {
    constructor(props: {}, state: SafetySettingsState) {
        super(props, state);

        this.state = {
            buyNowDelay: true,
            frequentSearchWarning: true,
            isPremium: false
        };
    }

    componentDidMount() {
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

        chrome.identity.getProfileUserInfo(userInfo => {
            const paidUsers = [
                "martellaj@gmail.com",
                "csgolounge.predict@gmail.com",
                "Denisostojic1991@gmail.com",
                "ethanhayyy23@gmail.com",
                "philip.kunstmann93@gmail.com",
                "guidohartig@gmail.com",
                "a.t.traspadini@gmail.com",
                "levenmillie@gmail.com",
                "roberto1988@hotmail.de",
                "pornotato@gmail.com",
                "mikione4@googlemail.com",
                "marcelkuel@gmail.com",
                "Joeypol4@gmail.com",
                "15barrettl@hadleighhigh.net",
                "tennagels2904@gmail.com",
                "mohamed.alqabany@gmail.com",
                "Benjaminhansenersej@gmail.com",
                "dtphelp24@gmail.com",
                "derknaub@gmail.com",
                "pablomasters@gmail.com",
                "youriu@gmail.com",
                "marc.fraunschiel@gmail.com",
                "jon.petter.hval@gmail.com",
                "yeswanth2561992@gmail.com",
                "thefutfathers@gmail.com",
                "j.hanenberg8@gmail.com",
                "hendaav7@gmail.com",
                "alinicola92@gmail.com",
                "t.andresen97@gmail.com",
                "florisvanderhout@gmail.com",
                "Karolkurpan@gmail.com"
            ];

            const lowerCasePaidUsers = paidUsers.map((email: string) =>
                email.toLocaleLowerCase()
            );
            const lowerCaseEmail =
                userInfo.email && userInfo.email.toLocaleLowerCase();

            if (lowerCasePaidUsers.indexOf(lowerCaseEmail) > -1) {
                this.updateToggleStates(true);
            } else {
                // Determine if user is premium by checking purchases.
                (window as any).google.payments.inapp.getPurchases({
                    parameters: { env: "prod" },
                    success: (response: any) => {
                        const purchase = response.response.details[0];

                        if (purchase) {
                            const isPremium =
                                purchase && purchase.state === "ACTIVE";
                            this.updateToggleStates(isPremium);
                        } else {
                            this.updateToggleStates(false);
                        }
                    },
                    failure: (response: any) => {
                        this.updateToggleStates(false);
                    }
                });
            }
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
            <div style={{ marginLeft: "12px" }}>
                <div
                    style={{
                        marginBottom: "6px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <h3 style={{ marginRight: "12px" }}>Safety settings</h3>
                        {!this.state.isPremium && (
                            <PrimaryButton
                                onClick={() => {
                                    (window as any).google.payments.inapp.buy({
                                        parameters: { env: "prod" },
                                        sku: "disable_safety_settings",
                                        success: (response: any) => {
                                            // Determine if user is premium by checking purchases.
                                            (window as any).google.payments.inapp.getPurchases(
                                                {
                                                    parameters: { env: "prod" },
                                                    success: (
                                                        response: any
                                                    ) => {
                                                        const purchase =
                                                            response.response
                                                                .details[0];

                                                        if (purchase) {
                                                            const isPremium =
                                                                purchase &&
                                                                purchase.state ===
                                                                    "ACTIVE";
                                                            chrome.storage.sync.set(
                                                                {
                                                                    isPremium: isPremium
                                                                }
                                                            );
                                                        } else {
                                                            chrome.storage.sync.set(
                                                                {
                                                                    isPremium: false
                                                                }
                                                            );
                                                        }
                                                    },
                                                    failure: (
                                                        response: any
                                                    ) => {
                                                        chrome.storage.sync.set(
                                                            {
                                                                isPremium: false
                                                            }
                                                        );
                                                    }
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
                                Buy shortfuts Premium
                            </PrimaryButton>
                        )}
                    </div>
                    {!this.state.isPremium && (
                        <span
                            style={{
                                fontSize: "12px",
                                fontStyle: "italic",
                                marginRight: "6px"
                            }}
                        >
                            In-app purchasing is not available in all countries.
                            If you're unable to purchase, please send us an
                            email at shortfuts@gmail.com.
                        </span>
                    )}
                </div>

                {/* Buy now delay */}
                <div style={{ marginBottom: "12px" }}>
                    <Toggle
                        label={`"Buy Now" delay`}
                        onText="On"
                        offText="Off"
                        checked={this.state.buyNowDelay}
                        disabled={!this.state.isPremium}
                        onChanged={(checked: boolean) => {
                            chrome.storage.sync.set(
                                {
                                    buyNowDelay: checked
                                },
                                () => {
                                    this.setState({
                                        buyNowDelay: checked
                                    });
                                }
                            );
                        }}
                    />
                    <p style={{ fontSize: "10px", marginTop: "0px" }}>
                        If ON, we'll add a <i>very</i> short delay so it's less
                        likely EA will think you're a bot. Be aware that the
                        chance of a ban gets significantly higher if you turn
                        this OFF.
                    </p>
                </div>

                {/* Frequent search warning */}
                <div>
                    <Toggle
                        label={`Warn me if I'm searching too quickly`}
                        onText="On"
                        offText="Off"
                        checked={this.state.frequentSearchWarning}
                        disabled={!this.state.isPremium}
                        onChanged={(checked: boolean) => {
                            chrome.storage.sync.set(
                                {
                                    frequentSearchWarning: checked
                                },
                                () => {
                                    this.setState({
                                        frequentSearchWarning: checked
                                    });
                                }
                            );
                        }}
                    />
                    <p style={{ fontSize: "10px", marginTop: "0px" }}>
                        We'll warn if you're searching faster than we think you
                        should be. If you're searching <i>too</i> quickly, EA
                        will think you're a bot.
                    </p>
                </div>
            </div>
        );
    }

    updateToggleStates(isPremium: boolean) {
        if (!isPremium) {
            this.setState(
                {
                    buyNowDelay: true,
                    frequentSearchWarning: true,
                    isPremium: false
                },
                () => {
                    chrome.storage.sync.set({
                        buyNowDelay: true
                    });

                    chrome.storage.sync.set({
                        frequentSearchWarning: true
                    });
                }
            );
            return;
        } else {
            this.setState({
                isPremium: true
            });
        }

        chrome.storage.sync.get("buyNowDelay", (data: any) => {
            const localBuyNowDelay =
                data.buyNowDelay !== undefined ? data.buyNowDelay : true;

            this.setState(
                {
                    buyNowDelay: localBuyNowDelay
                },
                () => {
                    chrome.storage.sync.set({
                        buyNowDelay: localBuyNowDelay
                    });
                }
            );
        });

        chrome.storage.sync.get("frequentSearchWarning", (data: any) => {
            const localFrequentSearchWarning =
                data.frequentSearchWarning !== undefined
                    ? data.frequentSearchWarning
                    : true;

            this.setState(
                {
                    frequentSearchWarning: localFrequentSearchWarning
                },
                () => {
                    chrome.storage.sync.set({
                        frequentSearchWarning: localFrequentSearchWarning
                    });
                }
            );
        });
    }
}
