import isUserOnPage from './isUserOnPage';

export default function getListItems() {
    let items = [];

    if (
        isUserOnPage('Search Results') ||
        isUserOnPage('Players') ||
        isUserOnPage('Club Items') ||
        isUserOnPage('Training') ||
        isUserOnPage('Contracts') ||
        isUserOnPage('Fitness') ||
        isUserOnPage('Healing') ||
        isUserOnPage('Positioning') ||
        isUserOnPage('Chemistry Styles')
    ) {
        const itemList = document.getElementsByClassName(
            'paginated-item-list'
        )[0];
        items = Array.from(itemList.getElementsByClassName('listFUTItem'));
    } else if (isUserOnPage('Transfer List') || isUserOnPage('Unassigned')) {
        const itemLists = Array.from(
            document.getElementsByClassName('itemList')
        );
        itemLists.forEach(function(itemList) {
            items = items.concat(
                Array.from(itemList.getElementsByClassName('listFUTItem'))
            );
        }, this);
    } else {
        const itemList = document.getElementsByClassName('itemList')[0];
        items = Array.from(itemList.getElementsByClassName('listFUTItem'));
    }

    return items;
}
