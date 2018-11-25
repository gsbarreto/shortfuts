import * as React from "react";
import Footer from "./popup/Footer";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Link } from "office-ui-fabric-react/lib/Link";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "./Announcement.scss";

@observer
export default class Announcement extends React.Component<{}, {}> {
    @observable private isOpen: boolean = false;

    private message: string = "";
    private message2: string = "";
    private showNeverWarnLink: boolean = false;
    private showUseAtYourOwnRisk: boolean = false;

    componentDidMount() {
        setInterval(() => {
            chrome.storage.sync.get("antiBan", data => {
                const count = data.antiBan;

                /**
                 * If count is -1, it means user asked not to be warned, so just
                 * return early.
                 */
                if (count === -1) {
                    return;
                }

                // If count is higher than safety threshold, give a warning.
                if (count > 22) {
                    // Show dismiss warning link forever.
                    this.showNeverWarnLink = true;

                    // Track that warning was shown.
                    chrome.runtime.sendMessage({
                        warningShown: true
                    });

                    // Display announcement.
                    this.setAnnouncement(
                        `You're going pretty fast there, cowboy! We've, unscientifically, determined that a reasonable amount of searches per minute (with a mouse) is about 22. You were going at a faster rate which puts you at high risk for a ban.`,
                        `This is just a warning to try to prevent you from getting banned. If you don't want to be warned again, simply click the link below and you'll never see this message again.`
                    );
                }

                // Clear count (regardless if we showed warning or not).
                chrome.storage.sync.set({
                    antiBan: 0
                });
            });
        }, 60000);

        /**
         * This is the announcement for making users who don't have their language
         * supported not leave me bad reviews.
         */
        const appLanguage = document.getElementsByTagName("html")[0].lang;
        if (
            appLanguage &&
            !(
                appLanguage.toLowerCase() === "en" ||
                appLanguage.toLowerCase() === "fr" ||
                appLanguage.toLowerCase() === "it" ||
                appLanguage.toLowerCase() === "de" ||
                appLanguage.toLowerCase() === "pl" ||
                appLanguage.toLowerCase() === "nl" ||
                appLanguage.toLowerCase() === "pt"
            )
        ) {
            this.setAnnouncement(
                `The language your web app is in isn't supported yet. Please send an email to shortfuts@gmail.com with the language you'd like to see supported next!`
            );

            return;
        }

        /**
         * This is the announcement for telling users to restart Chrome after installing
         * shortfuts because, for some reason, they listener doesn't respond for some
         * users until they restart.
         */
        chrome.storage.sync.get(null, data => {
            const latestAnnouncementVersion = 14;
            const announcementKillswitchEnabled = true;

            if (data.freSeen === undefined) {
                this.setAnnouncement(
                    `Thank you for installing shortfuts. If you find some shortcuts not working, please try fully restarting Google Chrome.`,
                    `If things still aren't working after that, please send an email to shortfuts@gmail.com and we'll help get you up and going!`
                );

                // Mark user as having seen FRE.
                chrome.storage.sync.set({
                    freSeen: true
                });
            } else if (data.useAtYourOwnRiskCount2 === undefined) {
                this.showUseAtYourOwnRisk = true;

                this.setAnnouncement(
                    `EA doesn't want you using this extension. If they detect you using it, they will ban you. Because of this, there are some safety features on by default to try to prevent you from getting banned. Open the extension popup in the Chrome toolbar to turn them off if you're feeling risky.`,
                    `While we feel the safety features will help circumvent most bans, please note the only way to guarantee you won't be banned and lose your club is to play by the rules and not use this extension.`
                );

                const updatedValue = data.useAtYourOwnRiskCount2
                    ? data.useAtYourOwnRiskCount2 + 1
                    : 1;

                // Increment seen count in storage.
                chrome.storage.sync.set({
                    useAtYourOwnRiskCount2: updatedValue
                });
            } else if (
                (data.announcementVersion === undefined ||
                    data.announcementVersion < latestAnnouncementVersion) &&
                !announcementKillswitchEnabled
            ) {
                this.setAnnouncement(
                    `This new update (v5.6.0) includes added support for Portuguese as well as an anti-ban warning (where you'll be warned if you're spamming the transfer market too much).`,
                    `Please feel free to reach out via email with any bugs or feature requests. Happy FUTing!`
                );

                // Set current version to storage.
                chrome.storage.sync.set({
                    announcementVersion: latestAnnouncementVersion
                });
            }
        });
    }

    render() {
        return (
            <Modal
                isOpen={this.isOpen}
                onDismiss={this.onModalDismissed}
                isBlocking={true}
            >
                <div className="announcementContainer ms-Fabric ms-borderColor-themePrimary ms-fontColor-themePrimary">
                    <div className="announcementHeader">shortfuts</div>
                    <div className="announcementBody">
                        <div className="announcementBullet">
                            <div className="announcementMessage">
                                {this.message}
                            </div>
                            {this.message2 && (
                                <div
                                    className="announcementMessage"
                                    style={{ marginTop: "12px" }}
                                >
                                    {this.message2}
                                </div>
                            )}

                            {!this.showNeverWarnLink &&
                                !this.showUseAtYourOwnRisk && (
                                    <Link
                                        style={{
                                            marginTop: "24px",
                                            fontSize: "14px"
                                        }}
                                        onClick={() => {
                                            // Hide link for next announcement.
                                            this.showUseAtYourOwnRisk = false;

                                            // Dimiss modal.
                                            this.onModalDismissed();
                                        }}
                                    >
                                        I definitely read this message, so
                                        please close it.
                                    </Link>
                                )}

                            {this.showNeverWarnLink && (
                                <Link
                                    style={{
                                        marginTop: "24px",
                                        fontSize: "14px"
                                    }}
                                    onClick={() => {
                                        // Set bit in storage not to show.
                                        chrome.storage.sync.set({
                                            antiBan: -1
                                        });

                                        // Hide link for next announcement.
                                        this.showNeverWarnLink = false;

                                        // Track event.
                                        chrome.runtime.sendMessage({
                                            warningDismissed: true
                                        });

                                        // Dimiss modal.
                                        this.onModalDismissed();
                                    }}
                                >
                                    Please don't warn me. I want to take the
                                    chance of getting banned.
                                </Link>
                            )}

                            {this.showUseAtYourOwnRisk && (
                                <Link
                                    style={{
                                        marginTop: "24px",
                                        fontSize: "14px"
                                    }}
                                    onClick={() => {
                                        // Hide link for next announcement.
                                        this.showUseAtYourOwnRisk = false;

                                        // Dimiss modal.
                                        this.onModalDismissed();
                                    }}
                                >
                                    I understand I'm using this extension at my
                                    own risk and won't cry if I get banned.
                                </Link>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </Modal>
        );
    }

    private onModalDismissed = () => {
        this.isOpen = false;
    };

    private setAnnouncement(message: string, message2: string = "") {
        // Set messages.
        this.message = message;
        this.message2 = message2;

        // Set visiblity.
        this.isOpen = true;
    }
}
