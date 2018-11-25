import clickBuyNowButton from "./helpers/clickBuyNowButton";
import confirmConfirmationDialog from "./helpers/confirmConfirmationDialog";
import isUserOnSearchResultsPage from "./helpers/isUserOnSearchResultsPage";
import { logError } from "../utils/logger";

export default function buyNow() {
    if (isUserOnSearchResultsPage()) {
        try {
            chrome.storage.sync.get("binDelay", (data: any) => {
                const shouldWait =
                    data.binDelay === undefined ? true : data.binDelay;

                if (shouldWait) {
                    setTimeout(() => {
                        clickBuyNowButton();
                        confirmConfirmationDialog();
                    }, wait());
                } else {
                    clickBuyNowButton();
                    confirmConfirmationDialog();
                }
            });
        } catch (error) {
            logError(`Oops! Couldn't "buy it now" for some reason...`);
        }
    }
}

function wait(): number {
    const min = 350;
    const max = 450;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
