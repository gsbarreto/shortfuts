import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';

export default function increaseMinBidPrice() {
    if (isUserOnPage('Search the Transfer Market')) {
        const button = document.getElementsByClassName('increment-value')[0];
        clickElement(button);
    }
}
