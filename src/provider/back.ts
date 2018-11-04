import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import isUserOnSearchResultsPage from './helpers/isUserOnSearchResultsPage';
import isUserOnSearchTransferMarketPage from './helpers/isUserOnSearchTransferMarketPage';
import isUserOnUnassignedPage from './helpers/isUserOnUnassignedPage';

export default function goBack() {
  // Prioritizes back button in secondary nav.
  const secondaryHeader = document.getElementsByClassName(
    "navbar-style-secondary"
  )[0];
  if (secondaryHeader && secondaryHeader.getElementsByTagName("button")[0]) {
    clickElement(secondaryHeader.getElementsByTagName("button")[0]);
    return;
  }

  // Falls back to primary nav back button.
  if (
    isUserOnSearchTransferMarketPage() ||
    isUserOnSearchResultsPage() ||
    isUserOnUnassignedPage() ||
    // English
    isUserOnPage("Transfer Targets") ||
    isUserOnPage("Transfers") ||
    // French
    isUserOnPage("Obj. de transferts") ||
    isUserOnPage("Transferts") ||
    // Italian
    isUserOnPage("Obiettivi mercato") ||
    isUserOnPage("Trasferim.")
  ) {
    clickElement(document.getElementsByClassName("btn-navigation")[0]);
    return;
  }
}
