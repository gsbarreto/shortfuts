import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';

export default function decreaseMaxBidPrice() {
    if (isUserOnPage('Search the Transfer Market')) {
        const button = document.getElementsByClassName('decrement-value')[1];
        clickElement(button);
    }
}
