import clickDetailsPanelButton from "./helpers/clickDetailsPanelButton";
import { logError } from "../utils/logger";

/**
 * Stores item in the club. If "Send to My Club" button can't be found, item
 * is treated as a coin unlock and attempts to redeem it.
 */
export default function storeInClub() {
    let buttonText = "Send to My Club";
    const language = document.getElementsByTagName("html")[0].lang;

    switch (language) {
        case "fr":
            buttonText = "Envoyer vers Mon club";
            break;
        case "it":
            buttonText = "Invia a Il mio club";
            break;
        case "de":
            buttonText = "Zu Mein Verein";
            break;
        case "pl":
            buttonText = "Wyślij do klubu";
            break;
        case "nl":
            buttonText = "Naar Mijn club sturen";
            break;
        case "pt":
            buttonText = "Enviar ao Meu clube";
            break;
    }

    try {
        clickDetailsPanelButton(buttonText);
    } catch (error) {
        logError("Unable to store that item in your club.");

        try {
            clickDetailsPanelButton("Redeem");
        } catch (error) {
            logError(`Oops! Couldn't redeem those coins.`);
        }
    }
}
