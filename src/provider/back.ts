import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import isUserOnSearchTransferMarketPage from './helpers/isUserOnSearchTransferMarketPage';
import { logError } from '../utils/logger';

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
    // English
    isUserOnPage("Search Results") ||
    isUserOnPage("Transfer Targets") ||
    isUserOnPage("Transfers") ||
    isUserOnPage("Unassigned") ||
    // French
    isUserOnPage("Résultats") ||
    isUserOnPage("Obj. de transferts") ||
    isUserOnPage("Transferts") ||
    isUserOnPage("NON ATTRIBUÉS")
  ) {
    clickElement(document.getElementsByClassName("btn-navigation")[0]);
    return;
  }
}
