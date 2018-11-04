import clickElement from './helpers/clickElement';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnUnassignedPage from './helpers/isUserOnUnassignedPage';

export default function quickSellAll() {
  if (isUserOnUnassignedPage()) {
    const quickSellAllButtons = document.getElementsByClassName(
      "ut-group-button cta"
    );

    clickElement(quickSellAllButtons[0]);
    confirmConfirmationDialog();
  }
}
