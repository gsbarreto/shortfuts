/**
 * Checks if user is on specific page.
 */
export default function isUserOnPage(pageTitle: string) {
    const title = document.getElementById('futHeaderTitle');
    return title && title.innerHTML === pageTitle;
}
