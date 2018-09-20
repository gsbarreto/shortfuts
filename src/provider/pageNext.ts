import clickElement from './helpers/clickElement';

export default function pageNext() {
    const nextPageButton = document.getElementsByClassName(
        'pagination next'
    )[0];

    if (nextPageButton) {
        clickElement(nextPageButton);
    }
}
