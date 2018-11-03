import clickDetailsPanelButton from './helpers/clickDetailsPanelButton';
import getListItemButtonText from './helpers/getListItemButtonText';
import { logError } from '../utils/logger';

export default function list() {
  const buttonText = getListItemButtonText();

  try {
    clickDetailsPanelButton(buttonText);
  } catch (error) {
    logError("Unable to list that card.");
  }
}
