import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import isUserOnSearchTransferMarketPage from './helpers/isUserOnSearchTransferMarketPage';

export default function decreaseMaxBidPrice() {
  if (isUserOnSearchTransferMarketPage()) {
    const button = document.getElementsByClassName("decrement-value")[1];
    clickElement(button);
  }
}
