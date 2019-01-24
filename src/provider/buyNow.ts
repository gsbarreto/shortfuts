import clickBuyNowButton from "./helpers/clickBuyNowButton";
import confirmConfirmationDialog from "./helpers/confirmConfirmationDialog";
import isUserOnSearchResultsPage from "./helpers/isUserOnSearchResultsPage";
import { logError } from "../utils/logger";

export default function buyNow() {
    if (isUserOnSearchResultsPage()) {
        try {
            chrome.storage.sync.get("buyNowDelay", (data: any) => {
                const shouldWait =
                    data.buyNowDelay === undefined ? true : data.buyNowDelay;

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
    const min = 450;
    const max = 550;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
