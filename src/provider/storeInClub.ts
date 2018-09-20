import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

/**
 * Stores item in the club. If "Send to My Club" button can't be found, item
 * is treated as a coin unlock and attempts to redeem it.
 */
export default function storeInClub() {
    try {
        clickDetailsPanelButton('Send to My Club');
    } catch (error) {
        logError('Failed to store item in the club.');

        try {
            clickDetailsPanelButton('Redeem');
        } catch (error) {
            logError('Failed to redeem coins.');
        }
    }
}
