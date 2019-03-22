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

    componentDidMount() {
        setInterval(() => {
            chrome.storage.sync.get("frequentSearchWarning", data => {
                if (data.frequentSearchWarning !== false) {
                    chrome.storage.sync.get("searchCount", data => {
                        const count = data.searchCount;

                        // If count is higher than safety threshold, give a warning.
                        if (count > 22) {
                            // Track that warning was shown.
                            chrome.runtime.sendMessage({
                                warningShown: true
                            });

                            // Display announcement.
                            this.setAnnouncement(
                                `You're going pretty fast there, cowboy! We've, unscientifically, determined that a reasonable amount of searches per minute (with a mouse) is about 22. You were going at a faster rate which puts you at high risk for a ban.`,
                                `This is just a warning to try to prevent you from getting banned. If you don't want to be warned again, you can disable it by opening the extension popup.`
                            );
                        }

                        // Clear count (regardless if we showed warning or not).
                        chrome.storage.sync.set({
                            searchCount: 0
                        });
                    });
                }
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
            if (data.freSeen === undefined) {
                this.setAnnouncement(
                    `Thank you for installing shortfuts. If you find some shortcuts not working, please try fully restarting Google Chrome.`,
                    `If things still aren't working after that, please send an email to shortfuts@gmail.com and we'll help get you up and going!`
                );

                // Mark user as having seen FRE.
                chrome.storage.sync.set({
                    freSeen: true
                });
            } else if (data.premiumAnnouncement === undefined) {
                this.setAnnouncement(
                    `While shortfuts is (and will remain) free, some functionality will now be gated by "shortfuts Premium". Currently, this functionality includes the ability to toggle the safety settings in the extension popup (i.e. the "buy now" delay and the "searching too quickly" warning).`,
                    `For a small one-time fee, you can unlock "shortfuts Premium" in the extension popup! By doing so, you'll be supporting the shortfuts developer and ensuring shortfuts is kept up-to-date and working past FIFA 19.`
                );

                // Mark user as having seen premium announcement.
                chrome.storage.sync.set({
                    premiumAnnouncement: true
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

                            <Link
                                style={{
                                    marginTop: "24px",
                                    fontSize: "14px"
                                }}
                                onClick={() => {
                                    // Dimiss modal.
                                    this.onModalDismissed();
                                }}
                            >
                                I definitely read this message, so please close
                                it.
                            </Link>
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
