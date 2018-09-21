import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function search() {
    if (!isUserOnPage('Search the Transfer Market')) {
        logError(
            `Failed to search because the user isn't on the "Search the Transfer Market" page.`
        );
        return;
    }

    const searchButton = document.getElementsByClassName(
        'btn-standard call-to-action'
    )[0];
    clickElement(searchButton);
}
