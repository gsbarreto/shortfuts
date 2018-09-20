import clickElement from './helpers/clickElement';
import isUserOnPage from './helpers/isUserOnPage';
import { logError } from '../utils/logger';

export default function goBack() {
    // Prioritizes back button in secondary nav.
    const secondaryHeader = document.getElementsByClassName('navbar-style-secondary')[0];
    if (secondaryHeader && secondaryHeader.getElementsByTagName('button')[0]) {
        clickElement(secondaryHeader.getElementsByTagName('button')[0]);
        return;
    }

    // Falls back to primary nav back button.
    if (
        isUserOnPage('Search Results') ||
        isUserOnPage('Objectives') ||
        isUserOnPage('Search the Transfer Market') ||
        isUserOnPage('Transfer Targets') ||
        isUserOnPage('Transfers') ||
        isUserOnPage('Squad Building Challenges') ||
        isUserOnPage('Squad Management') ||
        isUserOnPage('Players') ||
        isUserOnPage('Consumables') ||
        isUserOnPage('Staff') ||
        isUserOnPage('Club Items')
    ) {
        clickElement(document.getElementsByClassName('btn-navigation')[0]);
        return;
    }
}
