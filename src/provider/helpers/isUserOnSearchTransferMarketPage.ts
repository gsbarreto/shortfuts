import isUserOnPage from './isUserOnPage';

export default function isUserOnSearchTransferMarketPage(): boolean {
  return (
    // English
    isUserOnPage("Search the Transfer Market") ||
    // French
    isUserOnPage("Marché transf.") ||
    // Italian
    isUserOnPage("Cerca in mercato")
  );
}
