import clickBuyNowButton from './helpers/clickBuyNowButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { log, logError } from '../../utils/logger';

export default function buyNow() {
    log('Buying itemm...');

    // Bail if user isn't on "Search Results" page.
    if (!isUserOnPage('Search Results')) {
        logError(
            `Failed to buy item because user isn't on "Search Results" page.`
        );
        return;
    }

    clickBuyNowButton();
    confirmConfirmationDialog();
}
