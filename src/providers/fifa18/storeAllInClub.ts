import clickElement from './helpers/clickElement';

export default function storeAllInClub() {
    const button = document.getElementsByClassName(
        'standard section-header-btn mini call-to-action'
    )[0];

    clickElement(button);
}
