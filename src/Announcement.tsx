import * as React from "react";
import Footer from "./popup/Footer";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "./Announcement.scss";

@observer
export default class Announcement extends React.Component<{}, {}> {
    @observable
    private isOpen: boolean = false;

    private message: string = "";
    private message2: string = "";

    componentDidMount() {
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
                appLanguage.toLowerCase() === "nl"
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
            const latestAnnouncementVersion = 12;
            const announcementKillswitchEnabled = true;

            if (
                data.announcementVersion === undefined ||
                data.announcementVersion < latestAnnouncementVersion ||
                !announcementKillswitchEnabled
            ) {
                this.setAnnouncement(
                    `Hey, shortfuts user! This is a warning. I've seen an increased number of users reporting that they've received permanent bans. This is because they are NOT using this extension responsibly, but spamming the transfer market with it like their favorite YouTuber.`,
                    `If you care about your club, I suggest you a.) use this extension responsibly (i.e. don't spam the transfer market) or b.) uninstall it (safer way). The extension will remain available if you choose to continue to use it, but just be careful!`
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
