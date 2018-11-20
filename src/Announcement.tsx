import * as React from "react";
import Footer from "./popup/Footer";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Link } from "office-ui-fabric-react/lib/Link";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "./Announcement.scss";

@observer
export default class Announcement extends React.Component<{}, {}> {
    @observable
    private isOpen: boolean = false;

    @observable
    private canDismiss: boolean = false;

    private message: string = "";
    private message2: string = "";
    private showNeverWarnLink: boolean = false;

    componentDidMount() {
        // Don't let users dismiss until 3 seconds have passed.
        setTimeout(() => {
            this.canDismiss = true;
        }, 3000);

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
        chrome.storage.sync.get("freSeen", data => {
            if (data.freSeen === undefined) {
                this.setAnnouncement(
                    `Thank you for installing shortfuts. If you find some shortcuts not working, please try fully restarting Google Chrome. If things still aren't working after that, please send an email to shortfuts@gmail.com and we'll help get you up and going!`
                );

                // Mark user as having seen FRE.
                chrome.storage.sync.set({
                    freSeen: true
                });

                return;
            }
        });

        /**
         * This is the announcement for making users aware that they shouldn't use
         * this extension and that they do so at their own risk!
         */
        chrome.storage.sync.get("useAtYourOwnRiskCount", data => {
            if (
                data.useAtYourOwnRiskCount === undefined ||
                data.useAtYourOwnRiskCount < 2
            ) {
                this.setAnnouncement(
                    `EA doesn't allow the use of third party extensions that may interfere with their website. While I do not consider this extension a breach of their terms of service, they may have different opinions and thus take action on your account.`,
                    `From my own experience, I believe this extension is safe to use (if used responsibly). If you continue to use it, you do so at your own risk.`
                );

                const updatedValue = data.useAtYourOwnRiskCount
                    ? data.useAtYourOwnRiskCount + 1
                    : 1;

                // Increment seen count in storage.
                chrome.storage.sync.set({
                    useAtYourOwnRiskCount: updatedValue
                });

                return;
            }
        });

        /**
         * This is the general announcement that I'll force people to see whenever
         * I feel like it.
         */
        chrome.storage.sync.get("announcementVersion", data => {
            const latestAnnouncementVersion = 14;
            const announcementKillswitchEnabled = false;

            if (
                (data.announcementVersion === undefined ||
                    data.announcementVersion < latestAnnouncementVersion) &&
                !announcementKillswitchEnabled
            ) {
                this.setAnnouncement(
                    `This new update (v5.5.0) includes added support for Portuguese as well as an anti-ban warning (where you'll be warned if you're spamming the transfer market too much).`,
                    `Please feel free to reach out via email with any bugs or feature requests. Happy FUTing!`
                );

                // Set current version to storage.
                chrome.storage.sync.set({
                    announcementVersion: latestAnnouncementVersion
                });
            }
        });

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
                        `You're going pretty fast there, cowboy! We've, unscientifically, determined that a reasonable ammount of searches per minute (with a mouse) is about 22. You were going at a faster rate which puts you at high risk for a ban.`,
                        `This is just a warning to try to prevent you from getting banned. If you don't want to be warned again, simply click the link below and you'll never see this message again.`
                    );
                }

                // Clear count (regardless if we showed warning or not).
                chrome.storage.sync.set({
                    antiBan: 0
                });
            });
        }, 60000);
    }

    render() {
        return (
            <Modal isOpen={this.isOpen} onDismiss={this.onModalDismissed}>
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
                            {this.showNeverWarnLink && (
                                <Link
                                    style={{
                                        marginTop: "24px",
                                        fontSize: "20px"
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
                                    Never warn me again!
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
        if (this.canDismiss) {
            this.isOpen = false;
        }
    };

    private setAnnouncement(message: string, message2: string = "") {
        // Set messages.
        this.message = message;
        this.message2 = message2;

        // Set visiblity.
        this.isOpen = true;
    }
}
