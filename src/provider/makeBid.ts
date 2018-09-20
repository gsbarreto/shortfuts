import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function makeBid() {
    try {
        clickDetailsPanelButton('Make Bid');
    } catch (error) {
        logError(`Couldn't make that bid for some reason.`);
    }
}
