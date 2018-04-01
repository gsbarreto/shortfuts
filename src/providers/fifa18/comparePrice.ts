import { log, logError } from '../../utils/logger';
import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';

export default function comparePrice() {
    try {
        log(
            'Comparing price of current item with items on the transfer market...'
        );
        clickDetailsPanelButton('Compare Price');
    } catch (error) {
        logError('Failed to compare price of current item.');
    }
}
