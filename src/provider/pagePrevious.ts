import clickElement from './helpers/clickElement';

export default function pagePrevious() {
    const previousPageButton = document.getElementsByClassName(
        'pagination prev'
    )[0];

    if (previousPageButton) {
        clickElement(previousPageButton);
    }
}
