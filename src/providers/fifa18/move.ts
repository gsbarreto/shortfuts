import clickElement from './helpers/clickElement';
import getCurrentSelectedIndex from './helpers/getCurrentSelectedIndex';
import getItemId from './helpers/getItemId';
import getListItems from './helpers/getListItems';
import { Direction } from '../Provider';
import { logError } from '../../utils/logger';

export default function move(direction: Direction) {
    // Clear FUTBIN data div, if it exists.
    const panel = document.getElementsByClassName(
        'slick-slide slick-current slick-active'
    )[0];
    const oldDiv = document.getElementById('shortfuts-div');
    if (oldDiv) {
        panel.removeChild(oldDiv);
    }

    try {
        const isDown = direction === 'down';

        // Get all items.
        let items = getListItems();

        // Get current index.
        const currentIndex = getCurrentSelectedIndex(items);

        if (isDown && currentIndex + 1 <= items.length) {
            selectNextItem(items, currentIndex);
        } else if (!isDown && currentIndex - 1 >= 0) {
            selectPreviousItem(items, currentIndex);
        }
    } catch (error) {
        logError(error);
        return;
    }
}

/**
 * Selects the next item in the list.
 */
function selectNextItem(items, currentIndex) {
    try {
        const nextItem = items[++currentIndex].getElementsByClassName(
            'has-tap-callback'
        )[0];
        clickElement(nextItem);
    } catch (error) {
        throw 'Unable to select next item.';
    }
}

/**
 * Selects the previous item in the list.
 */
function selectPreviousItem(items, currentIndex) {
    try {
        const previousItem = items[--currentIndex].getElementsByClassName(
            'has-tap-callback'
        )[0];
        clickElement(previousItem);
    } catch (error) {
        throw 'Unable to select previous item.';
    }
}
