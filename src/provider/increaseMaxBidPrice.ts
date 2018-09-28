import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';

export default function increaseMaxBidPrice() {
    if (isUserOnPage('Search the Transfer Market')) {
        const button = document.getElementsByClassName('increment-value')[1];
        clickElement(button);
    }
}
