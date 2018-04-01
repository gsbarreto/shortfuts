import { log, logError } from '../../utils/logger';
import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';

/**
 * Stores item in the club. If "Send to My Club" button can't be found, item
 * is treated as a coin unlock and attempts to redeem it.
 */
export default function storeInClub() {
    try {
        log('Storing item in the club...');
        clickDetailsPanelButton('Send to My Club');
    } catch (error) {
        logError('Failed to store item in the club.');

        try {
            log('Redeeming coins...');
            clickDetailsPanelButton('Redeem');
        } catch (error) {
            logError('Failed to redeem coins.');
        }
    }
}
