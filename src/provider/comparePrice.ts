import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function comparePrice() {
    try {
        clickDetailsPanelButton('Compare Price');
    } catch (error) {
        logError(`Couldn't compare the price of that item for some reason.`);
    }
}
