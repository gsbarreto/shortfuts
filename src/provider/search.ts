import clickElement from './helpers/clickElement';
import isUserOnSearchTransferMarketPage from './helpers/isUserOnSearchTransferMarketPage';
import { logError } from '../utils/logger';

export default function search() {
  if (!isUserOnSearchTransferMarketPage()) {
    logError(
      `Failed to search because the user isn't on the "Search the Transfer Market" page.`
    );
    return;
  }

  const searchButton = document.getElementsByClassName(
    "btn-standard call-to-action"
  )[0];
  clickElement(searchButton);
}
