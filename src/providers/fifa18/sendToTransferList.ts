import { logError } from '../../utils/logger';
import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';

export default function sendToTransferList() {
    try {
        clickDetailsPanelButton('Send to Transfer List');
    } catch (error) {
        logError('Failed to send item to transfer list.');
    }
}
