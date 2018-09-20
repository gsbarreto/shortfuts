import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function sendToTransferList() {
    try {
        clickDetailsPanelButton('Send to Transfer List');
    } catch (error) {
        logError('Failed to send item to transfer list.');
    }
}
