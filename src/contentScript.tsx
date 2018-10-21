import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Announcement from './Announcement';
import getProvider from './provider/getProvider';
import Shortcut from './shortcuts/Shortcut';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { log } from './utils/logger';

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

      ReactDOM.render(
        <Announcement />,
        document.getElementById("updateAnchor")
      );

      return;
    }
  }, 2000);

  // Update badge with current status.
  chrome.storage.sync.get("isActive", data => {
    // Make extension active on first run.
    if (data.isActive === undefined) {
      chrome.storage.sync.set({ isActive: true }, () => {
        chrome.runtime.sendMessage({ isActive: true });
      });
      return;
    }

    chrome.runtime.sendMessage({ isActive: data.isActive });
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
      // Update badge with current status.
      const isActive = data.isActive;
      chrome.runtime.sendMessage({ isActive: isActive });

      /**
       * Check "Alt + Space" first because that toggles the extension as active
       * or not.
       */
      if (ev.altKey && keyCode === 32 /* Alt + Space */) {
        chrome.storage.sync.set({ isActive: !isActive }, function() {
          chrome.runtime.sendMessage({
            isActive: !isActive
          });
        });
        return;
      }

      // If extension isn't active, don't process hotkeys.
      if (!isActive) {
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
            break;
          case Shortcut.BIN:
            provider.buyNow();
            break;
          case Shortcut.BRONZE_PACK:
            provider.buyBronzePack();
            break;
          case Shortcut.COMPARE:
            provider.comparePrice();
            break;
          case Shortcut.DECREASE_MAX:
            provider.decreaseMaxBidPrice();
            break;
          case Shortcut.DECREASE_MIN:
            provider.decreaseMinBidPrice();
            break;
        }
      });
    });
  });
})();
