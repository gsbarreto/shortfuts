import isUserOnPage from "./isUserOnPage";

export default function isUserOnUnassignedPage(): boolean {
    return (
        // English
        isUserOnPage("Unassigned") ||
        // French
        isUserOnPage("NON ATTRIBUÉS") ||
        // Italian
        isUserOnPage("NON ASSEGNATI") ||
        // German
        isUserOnPage("NICHT ZUGEWIESEN") ||
        // Polish
        isUserOnPage("Nieprzypisane") ||
        // Dutch
        isUserOnPage("NIET TOEGEWEZ.") ||
        // Portuguese
        isUserOnPage("Não Atribuídos")
    );
}
