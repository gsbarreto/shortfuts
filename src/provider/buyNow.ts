import clickBuyNowButton from "./helpers/clickBuyNowButton";
import confirmConfirmationDialog from "./helpers/confirmConfirmationDialog";
import isUserOnSearchResultsPage from "./helpers/isUserOnSearchResultsPage";
import { logError } from "../utils/logger";

export default function buyNow() {
    if (isUserOnSearchResultsPage()) {
        try {
            setTimeout(() => {
                clickBuyNowButton();
                confirmConfirmationDialog();
            }, wait());
        } catch (error) {
            logError(`Oops! Couldn't "buy it now" for some reason...`);
        }
    }
}

function wait(): number {
    const min = 350;
    const max = 450;

    let shouldWait = true;
    chrome.storage.sync.get("binDelay", (data: any) => {
        shouldWait = data.binDelay === undefined ? true : data.binDelay;
    });

    if (!shouldWait) {
        return 0;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}
