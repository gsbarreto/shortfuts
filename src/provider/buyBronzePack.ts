import clickElement from './helpers/clickElement';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function buyBronzePack() {
    if (!isUserOnPage('Store')) {
        logError(`Go to the "Store" page to buy a bronze pack!`);
        return;
    }

    // Go to "Bronze" tab of the store.
    // Select the last tab, which contain the bronze packs.
    const packTabButtons = document.getElementsByClassName('tab-menu-item');
    const bronzeTabButton = packTabButtons[packTabButtons.length - 1];
    clickElement(bronzeTabButton);

    setTimeout(() => {
        // Buy a 400 coin bronze pack.
        const bronzePackButton = document.getElementsByClassName(
            'currency call-to-action coins'
        )[0];
        clickElement(bronzePackButton);

        // Press OK.
        confirmConfirmationDialog();
    }, 250);
}
