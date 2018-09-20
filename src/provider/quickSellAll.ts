import clickElement from './helpers/clickElement';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function quickSellAll() {
    if (!isUserOnPage('Unassigned')) {
        logError(
            `Failed to quick sell all items because user isn't on "Unassigned" page.`
        );
        return;
    }

    const quickSellAllButtons = document.getElementsByClassName(
        'ut-group-button cta'
    );

    clickElement(quickSellAllButtons[0]);
    confirmConfirmationDialog();
}
