import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import isUserOnSearchTransferMarketPage from './helpers/isUserOnSearchTransferMarketPage';

export default function increaseMinBidPrice() {
  if (isUserOnSearchTransferMarketPage()) {
    const button = document.getElementsByClassName("increment-value")[0];
    clickElement(button);
  }
}
