import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import { logError } from '../utils/logger';

export default function quickSell() {
    try {
        clickDetailsPanelButton('Quick Sell');
        confirmConfirmationDialog();
    } catch (error) {
        logError(`Oops! Couldn't quick sell that.`);

        try {
            clickDetailsPanelButton('Redeem');
        } catch (error) {
            logError(`Oops! Couldn't redeem those coins.`);
        }
    }
}
