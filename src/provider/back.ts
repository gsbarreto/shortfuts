import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function goBack() {
    if (!isUserOnPage('Search Results')) {
        logError(
            `Failed to "go back" because user isn't on the "Search Results" page.`
        );
        return;
    }

    try {
        const backButton = document.getElementsByClassName(
            'btn-flat back headerButton'
        )[0];
        clickElement(backButton);
    } catch (error) {
        logError(error);
    }
}
