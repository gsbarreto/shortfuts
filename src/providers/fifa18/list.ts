import { logError } from '../../utils/logger';
import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';

export default function list() {
    try {
        clickDetailsPanelButton('List Item');
    } catch (error) {
        logError('Failed to list item.');
    }
}
