import isUserOnPage from "./isUserOnPage";

export default function isUserOnSearchResultsPage(): boolean {
    return (
        // English
        isUserOnPage("Search Results") ||
        // French
        isUserOnPage("Résultats") ||
        // Italian
        isUserOnPage("Risultati Ricerca") ||
        // German
        isUserOnPage("Suchergebnisse") ||
        // Polish
        isUserOnPage("Wyniki wyszukiwania") ||
        // Dutch
        isUserOnPage("Zoekresultaten") ||
        // Portuguese
        isUserOnPage("Resultados da Busca")
    );
}
