import { log, logError } from '../logger';
import clickElement from './clickElement';

export default function clickDetailsPanelButton(buttonLabel: string) {
    log(`Attempting to press "${buttonLabel}" button...`);

    try {
        // Expand "List on Transfer Market" section.
        if (buttonLabel === 'List Item') {
            const _buttons = document.getElementsByTagName('button');
            const buttons = Array.from(_buttons);
            for (const button of buttons) {
                if (
                    button &&
                    button.innerHTML.indexOf('List on Transfer Market') > -1
                ) {
                    clickElement(button);

                    setTimeout(() => {
                        // Get buttons in the details panel.
                        const detailsPanel = document.getElementsByClassName(
                            'DetailPanel'
                        )[0];
                        const detailsPanelButtons = detailsPanel.getElementsByTagName(
                            'button'
                        );
                        const buttonArray = Array.from(detailsPanelButtons);

                        // Find target button by searching by label.
                        const _button = buttonArray.filter(
                            __button =>
                                __button.innerHTML.indexOf(buttonLabel) > -1 &&
                                __button.style.display !== 'none'
                        )[0];

                        // Click target button.
                        clickElement(_button);
                    }, 1000);

                    return;
                }
            }
        }

        // Get buttons in the details panel.
        const detailsPanel = document.getElementsByClassName('DetailPanel')[0];
        const detailsPanelButtons = detailsPanel.getElementsByTagName('button');
        const buttonArray = Array.from(detailsPanelButtons);

        // Find target button by searching by label.
        const _button = buttonArray.filter(
            foo =>
                foo.innerHTML.indexOf(buttonLabel) > -1 &&
                foo.style.display !== 'none'
        )[0];

        // Click target button.
        clickElement(_button);
    } catch (error) {
        logError(`Unable to locate the "${buttonLabel}" button.`);
    }
}
