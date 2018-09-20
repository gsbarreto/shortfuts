import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function list() {
    try {
        clickDetailsPanelButton('List Item');
    } catch (error) {
        logError('Unable to list that card.');
    }
}
