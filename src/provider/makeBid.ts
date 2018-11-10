import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import { logError } from '../utils/logger';

export default function makeBid() {
  let buttonText = "Make Bid";
  const language = document.getElementsByTagName("html")[0].lang;

  switch (language) {
    case "fr":
      buttonText = "Faire offre";
      break;
    case "it":
      buttonText = "Fai offerta";
      break;
    case "de":
      buttonText = "Bieten";
      break;
    case "pl":
      buttonText = "Zalicytuj";
      break;
  }

  try {
    clickDetailsPanelButton(buttonText);
  } catch (error) {
    logError(`Couldn't make that bid for some reason.`);
  }
}
