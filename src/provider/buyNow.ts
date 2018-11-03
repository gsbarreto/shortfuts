import clickBuyNowButton from './helpers/clickBuyNowButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function buyNow() {
  if (
    // English
    isUserOnPage("Search Results") ||
    isUserOnPage("Résultats")
  ) {
    try {
      clickBuyNowButton();
      confirmConfirmationDialog();
    } catch (error) {
      logError(`Oops! Couldn't "buy it now" for some reason...`);
    }
  }
}
