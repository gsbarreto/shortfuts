import isUserOnPage from './isUserOnPage';

export default function isUserOnSearchTransferMarketPage(): boolean {
  return (
    // English
    isUserOnPage("Search the Transfer Market") ||
    // French
    isUserOnPage("Marché transf.") ||
    // Italian
    isUserOnPage("Cerca in mercato") ||
    // German
    isUserOnPage("Transfermarkt-Suche") ||
    // Polish
    isUserOnPage("Szukaj na rynku") ||
    // Dutch
    isUserOnPage("Doorzoek de transfermarkt")
  );
}
