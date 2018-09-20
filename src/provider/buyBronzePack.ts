import clickElement from './helpers/clickElement';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function buyBronzePack() {
    if (!isUserOnPage('Store')) {
        logError(
            `Failed to buy bronze pack because user isn't on "Store" page.`
        );
        return;
    }

    // Go to "Bronze" tab of the store.
    // Select the last tab, which contain the bronze packs.
    const packTabButtons = document.getElementsByClassName('TabMenuItem');
    const bronzeTabButton = packTabButtons[packTabButtons.length - 1];
    clickElement(bronzeTabButton);

    setTimeout(() => {
        // Buy a 400 coin bronze pack.
        const bronzePackButton = document.getElementsByClassName(
            'currency call-to-action cCoins'
        )[0];
        clickElement(bronzePackButton);

        // Press OK.
        confirmConfirmationDialog();
    }, 250);
}
