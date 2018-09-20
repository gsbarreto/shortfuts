import getCurrentSelectedIndex from './helpers/getCurrentSelectedIndex';
import getItemId from './helpers/getItemId';
import getListItems from './helpers/getListItems';
import { logError } from '../utils/logger';

export default function futbin() {
    try {
        // Get host panel where we will add our stuff.
        const panel = document.getElementsByClassName(
            'slick-slide slick-current slick-active'
        )[0];

        // Clear "old" div, if it exists.
        const oldDiv = document.getElementById('shortfuts-div');
        if (oldDiv) {
            panel.removeChild(oldDiv);
        }

        // Get all items.
        let items = getListItems();

        // Get current index.
        let currentIndex = getCurrentSelectedIndex(items);

        // Get the ID of the object.
        const id = getItemId(items[currentIndex]);

        // Fire request to FUTBIN to get price data.
        const xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            'https://www.futbin.com/18/playerPrices?player=' + id,
            true
        );
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                try {
                    const response = JSON.parse(xhr.responseText);

                    // Ensures that the response from FUTBIN has the price data.
                    if (response[id].prices) {
                        const xboxSpan = createPriceUI(
                            'Xbox',
                            response[id].prices
                        );
                        const psSpan = createPriceUI('PS', response[id].prices);
                        const pcSpan = createPriceUI('PC', response[id].prices);

                        const div = document.createElement('div');
                        div.id = 'shortfuts-div';

                        div.appendChild(xboxSpan);
                        div.appendChild(psSpan);
                        div.appendChild(pcSpan);

                        // Add small timeout for visual indicator.
                        setTimeout(() => {
                            // Definitely can prepend stuff in a div...
                            // @ts-ignore
                            panel.prepend(div);
                        }, 100);
                    }
                } catch (error) {
                    logError(error);
                    logError('Unable to get FUTBIN data.');
                }
            }
        };
        xhr.send();
    } catch (error) {
        // Get host panel where we will add our stuff.
        const panel = document.getElementsByClassName(
            'slick-slide slick-current slick-active'
        )[0];

        // Clear "old" div, if it exists.
        const oldDiv = document.getElementById('shortfuts-div');
        if (oldDiv) {
            panel.removeChild(oldDiv);
        }
    }
}

function createPriceUI(platform: string, prices: any) {
    // If no data, bail.
    if (!prices) {
        return document.createElement('span');
    }

    // Get the object that matches platform.
    let platformPrices;
    if (platform === 'Xbox') {
        platformPrices = prices.xbox;
    } else if (platform === 'PS') {
        platformPrices = prices.ps;
    } else if (platform === 'PC') {
        platformPrices = prices.pc;
    }

    // Format the "last updated" string.
    const updatedString = platformPrices['updated']
        ? platformPrices['updated'].toLowerCase()
        : 'never';

    // If a price has never been updated, bail.
    if (updatedString === 'never') {
        return document.createElement('span');
    }

    // Create UI that shows platform, last updated time, and lowest 3 BIN prices.
    const pricesDiv = document.createElement('div');
    pricesDiv.textContent = `${platform} (updated ${updatedString}): ${platformPrices[
        'LCPrice'
    ] || 0}, ${platformPrices['LCPrice2'] || '0'}, ${platformPrices[
        'LCPrice3'
    ] || '0'}`;

    return pricesDiv;
}
