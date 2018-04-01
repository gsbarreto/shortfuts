import { logError } from '../../utils/logger';
import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import clickElement from './helpers/clickElement';

export default function listMinBin() {
    const quickListPanel = document.getElementsByClassName('QuickListPanel')[0];
    const quickListPanelActions = quickListPanel.getElementsByClassName(
        'panelActions'
    )[0];
    const actionRows = quickListPanelActions.getElementsByClassName(
        'panelActionRow'
    );

    const startPriceRow = actionRows[1];
    const startPriceInput = startPriceRow.getElementsByTagName('input')[0];
    startPriceInput.value = '150';

    const binRow = actionRows[2];
    const binInput = binRow.getElementsByTagName('input')[0];
    binInput.value = '200';

    // Get all buttons in "List on Transfer Market" section.
    const _buttons = quickListPanelActions.getElementsByTagName('button');
    const buttons: HTMLElement[] = Array.from(_buttons);

    // Find button with "List Item" as text and tap it.
    let listItemButton;
    for (const button of buttons) {
        if (button && button.innerHTML === 'List Item') {
            listItemButton = button;
        }
    }

    clickElement(listItemButton);
}
