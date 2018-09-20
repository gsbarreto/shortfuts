import clickElement from './clickElement';
import { logError } from '../../utils/logger';

/**
 * Presses "OK" button in confirmation dialog.
 */
export default function confirmConfirmationDialog() {
    setTimeout(() => {
        try {
            const okButton = document
                .getElementsByClassName('Dialog')[0]
                .getElementsByClassName('flat')[1];
            clickElement(okButton);
        } catch (error) {
            logError(error);
            throw error;
        }
    }, 250);
}
