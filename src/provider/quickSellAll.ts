import clickElement from './helpers/clickElement';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function quickSellAll() {
  if (
    // English
    isUserOnPage("Unassigned") ||
    // French
    isUserOnPage("NON ATTRIBUÉS")
  ) {
    const quickSellAllButtons = document.getElementsByClassName(
      "ut-group-button cta"
    );

    clickElement(quickSellAllButtons[0]);
    confirmConfirmationDialog();
  }
}
