import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function sendToTransferList() {
    try {
        clickDetailsPanelButton('Send to Transfer List');
    } catch (error) {
        logError(`Couldn't send that item to the transfer list.`);
    }
}
