import clickElement from './clickElement';
import { logError } from '../../utils/logger';

/**
 * Clicks "Buy Now" button.
 */
export default function clickBuyNowButton() {
    const buyNowButton = document.getElementsByClassName('buyButton')[0];

    if (buyNowButton) {
        clickElement(buyNowButton);
    } else {
        logError(`Couldn't find the "Buy Now" button.`);
        throw 'Unable to find "Buy Now" button.';
    }
}
