import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import isUserOnSearchTransferMarketPage from './helpers/isUserOnSearchTransferMarketPage';

export default function decreaseMinBidPrice() {
  if (isUserOnSearchTransferMarketPage()) {
    const button = document.getElementsByClassName("decrement-value")[0];
    clickElement(button);
  }
}
