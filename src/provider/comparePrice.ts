import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function comparePrice() {
    try {
        clickDetailsPanelButton('Compare Price');
    } catch (error) {
        logError('Failed to compare price of current item.');
    }
}
