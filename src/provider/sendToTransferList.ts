import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function sendToTransferList() {
  let buttonText = "Send to Transfer List";
  const language = document.getElementsByTagName("html")[0].lang;

  switch (language) {
    case "fr":
      buttonText = "Env. Liste transf.";
      break;
    case "it":
      buttonText = "Invia a trasferim.";
      break;
    case "de":
      buttonText = "Auf Transferliste";
      break;
    case "pl":
      buttonText = "Wyślij na listę transferową";
      break;
    case "nl":
      buttonText = "Naar Mijn club sturen";
      break;
  }

  try {
    clickDetailsPanelButton(buttonText);
  } catch (error) {
    logError(`Couldn't send that item to the transfer list.`);
  }
}
