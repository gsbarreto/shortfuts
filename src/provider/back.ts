import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function goBack() {
    const searchResultsHeader = document.getElementsByClassName(
        'navbar-style-secondary'
    )[0];

    if (!searchResultsHeader) {
        logError(
            `Failed to "go back" because user isn't on the "Search Results" page.`
        );
        return;
    }

    try {
        const backButton = searchResultsHeader.getElementsByTagName(
            'button'
        )[0];
        clickElement(backButton);
    } catch (error) {
        logError(error);
    }
}
