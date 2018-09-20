import clickBuyNowButton from './helpers/clickBuyNowButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function buyNow() {
    // Bail if user isn't on "Search Results" page.
    if (!isUserOnPage('Search Results')) {
        logError(
            `Unable to "buy it now" because you're not on the "Search Results" page.`
        );
        return;
    }

    try {
        clickBuyNowButton();
        confirmConfirmationDialog();
    } catch (error) {
        logError(`Oops! Couldn't "buy it now" for some reason...`);
    }
}
