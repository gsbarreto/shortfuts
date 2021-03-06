import clickDetailsPanelButton from "./helpers/clickDetailsPanelButton";
import { logError } from "../utils/logger";

export default function comparePrice() {
    let buttonText = "Compare Price";
    const language = document.getElementsByTagName("html")[0].lang;

    switch (language) {
        case "fr":
            buttonText = "Comparer prix";
            break;
        case "it":
            buttonText = "Confronta prezzo";
            break;
        case "de":
            buttonText = "Preisvergleich";
            break;
        case "pl":
            buttonText = "Porównaj cenę";
            break;
        case "nl":
            buttonText = "Prijs vergelijken";
            break;
        case "pt":
            buttonText = "Comparar preço";
            break;
    }

    try {
        clickDetailsPanelButton(buttonText);
    } catch (error) {
        logError(`Couldn't compare the price of that item for some reason.`);
    }
}
