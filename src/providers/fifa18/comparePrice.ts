import { logError } from '../../utils/logger';
import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';

export default function comparePrice() {
    try {
        clickDetailsPanelButton('Compare Price');
    } catch (error) {
        logError('Failed to compare price of current item.');
    }
}
