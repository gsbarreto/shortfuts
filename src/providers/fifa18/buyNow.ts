import clickBuyNowButton from './helpers/clickBuyNowButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../../utils/logger';

export default function buyNow() {
    // Bail if user isn't on "Search Results" page.
    if (!isUserOnPage('Search Results')) {
        logError(
            `Failed to buy item because user isn't on "Search Results" page.`
        );
        return;
    }

    try {
        clickBuyNowButton();
        confirmConfirmationDialog();
    } catch (error) {
        logError('Failed to buy item.');
    }
}
