import * as React from "react";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";

interface SafetySettingsState {
    binDelay: boolean;
    antiBan: number; // Legacy name for frequent searching warning
}

export default class SafetySettings extends React.Component<
    {},
    SafetySettingsState
> {
    constructor(props: {}, state: SafetySettingsState) {
        super(props, state);

        this.state = {
            binDelay: true,
            antiBan: 0
        };
    }

    componentDidMount() {
        chrome.storage.sync.get("binDelay", (data: any) => {
            const localBinDelay =
                data.binDelay !== undefined ? data.binDelay : true;

            this.setState(
                {
                    binDelay: localBinDelay
                },
                () => {
                    chrome.storage.sync.set({
                        binDelay: localBinDelay
                    });
                }
            );
        });

        chrome.storage.sync.get("antiBan", (data: any) => {
            const localAntiBan = data.antiBan !== undefined ? data.antiBan : 0;

            this.setState(
                {
                    antiBan: localAntiBan
                },
                () => {
                    chrome.storage.sync.set({
                        antiBan: localAntiBan
                    });
                }
            );
        });
    }

    render() {
        return (
            <div style={{ marginLeft: "12px" }}>
                <h3 style={{ marginBottom: "6px" }}>Safety settings</h3>
                {/* Buy now delay */}
                <div style={{ marginBottom: "12px" }}>
                    <Toggle
                        label={`"Buy Now" delay`}
                        onText="On"
                        offText="Off"
                        checked={this.state.binDelay}
                        onChanged={(checked: boolean) => {
                            chrome.storage.sync.set(
                                {
                                    binDelay: checked
                                },
                                () => {
                                    this.setState({
                                        binDelay: checked
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
                        checked={this.state.antiBan > -1}
                        onChanged={(checked: boolean) => {
                            chrome.storage.sync.set(
                                {
                                    antiBan: checked
                                },
                                () => {
                                    this.setState({
                                        antiBan: checked ? 0 : -1
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
}
