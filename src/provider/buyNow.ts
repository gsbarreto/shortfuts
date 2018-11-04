import clickBuyNowButton from './helpers/clickBuyNowButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnSearchResultsPage from './helpers/isUserOnSearchResultsPage';
import { logError } from '../utils/logger';

export default function buyNow() {
  if (isUserOnSearchResultsPage()) {
    try {
      clickBuyNowButton();
      confirmConfirmationDialog();
    } catch (error) {
      logError(`Oops! Couldn't "buy it now" for some reason...`);
    }
  }
}
