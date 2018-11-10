import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog';
import { logError } from '../utils/logger';

export default function quickSell() {
  let buttonText = "Quick Sell";
  const language = document.getElementsByTagName("html")[0].lang;

  switch (language) {
    case "fr":
      buttonText = "Vente rapide";
      break;
    case "it":
      buttonText = "Scarta";
      break;
    case "de":
      buttonText = "Abstoßen";
      break;
    case "pl":
      buttonText = "Szybka sprzedaż";
      break;
    case "nl":
      buttonText = "Snel verkopen";
      break;
  }

  try {
    clickDetailsPanelButton(buttonText);
    confirmConfirmationDialog();
  } catch (error) {
    logError(`Oops! Couldn't quick sell that.`);

    try {
      clickDetailsPanelButton("Redeem");
    } catch (error) {
      logError(`Oops! Couldn't redeem those coins.`);
    }
  }
}
