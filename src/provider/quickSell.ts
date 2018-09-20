import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import { logError } from '../utils/logger';

export default function quickSell() {
    try {
        clickDetailsPanelButton('Quick Sell');
        confirmConfirmationDialog();
    } catch (error) {
        logError('Failed to quick sell item.');

        try {
            clickDetailsPanelButton('Redeem');
        } catch (error) {
            logError('Failed to redeem coins.');
        }
    }
}
