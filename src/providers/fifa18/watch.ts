import clickElement from './helpers/clickElement';
import { logError } from '../../utils/logger';

export default function watch() {
    try {
        const watchButton = document.getElementsByClassName('watch')[0];
        clickElement(watchButton);
    } catch (error) {
        logError('Unable to click "Watch" or "Unwatch" button.');
    }
}
