import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';

export default function decreaseMinBidPrice() {
    if (isUserOnPage('Search the Transfer Market')) {
        const button = document.getElementsByClassName('decrement-value')[0];
        clickElement(button);
    }
}
