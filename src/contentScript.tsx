import * as React from "react";
import * as ReactDOM from "react-dom";
import Announcement from "./Announcement";
import getProvider from "./provider/getProvider";
import Shortcut from "./shortcuts/Shortcut";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { log } from "./utils/logger";

(function() {
    log("Content script has loaded and is running.");

    // Initialize OUFR icons.
    initializeIcons();

    setTimeout(() => {
        const header = document.getElementById("FIFAHeader");
        if (header) {
            const updateAnchor = document.createElement("div");
            updateAnchor.id = "updateAnchor";
            header.appendChild(updateAnchor);

            const div = document.createElement("div");
            div.style.display = "flex";
            div.style.alignItems = "center";
            div.style.justifyContent = "center";

            const a = document.createElement("a");
            a.innerText =
                "Making coins because of shortfuts? Spread the wealth!";
            a.style.display = "inline-block";
            a.style.paddingLeft = "24px";
            a.style.paddingTop = "4px";
            a.style.fontSize = "30px";
            a.target = "_blank";
            a.href = "https://ko-fi.com/shortfuts";

            const a2 = document.createElement("a");
            a2.innerText = "Or just leave a review in the store!";
            a2.style.display = "inline-block";
            a2.style.paddingLeft = "16px";
            a2.style.paddingTop = "8px";
            a2.style.fontSize = "18px";
            a2.target = "_blank";
            a2.href =
                "https://chrome.google.com/webstore/detail/shortfuts/piepdojghinggmddebidfkhfbdaggnmh";

            div.appendChild(a);
            div.appendChild(a2);
            header.appendChild(div);

            ReactDOM.render(
                <Announcement />,
                document.getElementById("updateAnchor")
            );

            return;
        }
    }, 2000);

    // If there are no shortcuts saved, set them as the default ones.
    chrome.storage.sync.get("shortcutsMap", data => {
        if (!data.shortcutsMap) {
            const defaultShortcuts = {
                0: Shortcut.BACK,
                D: Shortcut.BID,
                N: Shortcut.BIN,
                B: Shortcut.BRONZE_PACK,
                C: Shortcut.COMPARE,
                J: Shortcut.DECREASE_MAX,
                I: Shortcut.DECREASE_MIN,
                K: Shortcut.INCREASE_MAX,
                O: Shortcut.INCREASE_MIN,
                M: Shortcut.LIST_MIN_BIN,
                L: Shortcut.LIST,
                A: Shortcut.QUICK_SELL_ALL,
                Q: Shortcut.QUICK_SELL,
                P: Shortcut.SEARCH,
                X: Shortcut.STORE_ALL,
                S: Shortcut.STORE,
                W: Shortcut.TOGGLE_WATCH,
                T: Shortcut.TRANSFER_LIST
            };

            chrome.storage.sync.set({ shortcutsMap: defaultShortcuts }, () => {
                log("Default shortcuts set for this user.");
            });
        }
    });

    // Get provider that performs hotkey actions for correct version of web app.
    const provider = getProvider();

    // Sets up listeners for non-configurable shortcuts.
    window.addEventListener("keydown", ev => {
        const keyCode = ev.keyCode;

        // If user is typing in an input, ignore hotkeys.
        if (document.activeElement.tagName.toLocaleLowerCase() === "input") {
            return;
        }

        chrome.storage.sync.get("isActive", data => {
            switch (keyCode) {
                case 8 /* backspace */:
                    provider.back();
                    return;
                case 38 /* up arrow */:
                    provider.move("up");
                    return;
                case 40 /* down arrow */:
                    provider.move("down");
                    return;
                case 37 /* left arrow */:
                    provider.pagePrevious();
                    return;
                case 39 /* right arrow */:
                    provider.pageNext();
                    return;
            }

            chrome.storage.sync.get("shortcutsMap", data => {
                const shortcutsMap = data.shortcutsMap;
                const shortcutKey = String.fromCharCode(keyCode);
                const shortcut = shortcutsMap[shortcutKey];

                switch (shortcut) {
                    case Shortcut.BACK:
                        provider.back();
                        break;
                    case Shortcut.BID:
                        provider.makeBid();
                        chrome.runtime.sendMessage({ makeBid: true });
                        break;
                    case Shortcut.BIN:
                        provider.buyNow();
                        chrome.runtime.sendMessage({ buyNow: true });
                        break;
                    case Shortcut.BRONZE_PACK:
                        provider.buyBronzePack();
                        chrome.runtime.sendMessage({ buyBronzePack: true });
                        break;
                    case Shortcut.COMPARE:
                        provider.comparePrice();
                        chrome.runtime.sendMessage({ comparePrice: true });
                        break;
                    case Shortcut.DECREASE_MAX:
                        provider.decreaseMaxBidPrice();
                        chrome.runtime.sendMessage({
                            decreaseMaxBidPrice: true
                        });
                        break;
                    case Shortcut.DECREASE_MIN:
                        provider.decreaseMinBidPrice();
                        chrome.runtime.sendMessage({
                            decreaseMinBidPrice: true
                        });
                        break;
                    case Shortcut.INCREASE_MAX:
                        provider.increaseMaxBidPrice();
                        chrome.runtime.sendMessage({
                            increaseMaxBidPrice: true
                        });
                        break;
                    case Shortcut.INCREASE_MIN:
                        provider.increaseMinBidPrice();
                        chrome.runtime.sendMessage({
                            increaseMinBidPrice: true
                        });
                        break;
                    case Shortcut.LIST_MIN_BIN:
                        provider.listMinBin();
                        chrome.runtime.sendMessage({ listMinBin: true });
                        break;
                    case Shortcut.LIST:
                        provider.list();
                        chrome.runtime.sendMessage({ list: true });
                        break;
                    case Shortcut.QUICK_SELL_ALL:
                        provider.quickSellAll();
                        chrome.runtime.sendMessage({ quickSellAll: true });
                        break;
                    case Shortcut.QUICK_SELL:
                        provider.quickSell();
                        chrome.runtime.sendMessage({ quickSell: true });
                        break;
                    case Shortcut.SEARCH:
                        provider.search();
                        chrome.runtime.sendMessage({ search: true });
                        break;
                    case Shortcut.STORE_ALL:
                        provider.storeAllInClub();
                        chrome.runtime.sendMessage({ storeAllInClub: true });
                        break;
                    case Shortcut.STORE:
                        provider.storeInClub();
                        chrome.runtime.sendMessage({ storeInClub: true });
                        break;
                    case Shortcut.TOGGLE_WATCH:
                        provider.watch();
                        chrome.runtime.sendMessage({ watch: true });
                        break;
                    case Shortcut.TRANSFER_LIST:
                        provider.sendToTransferList();
                        chrome.runtime.sendMessage({
                            sendToTransferList: true
                        });
                        break;
                }
            });
        });
    });
})();
