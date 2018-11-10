import isUserOnSearchResultsPage from './isUserOnSearchResultsPage';
import isUserOnUnassignedPage from './isUserOnUnassignedPage';

export default function getListItems() {
  let items = [];

  if (isUserOnSearchResultsPage()) {
    const itemList = document.getElementsByClassName("paginated-item-list")[0];
    items = Array.from(itemList.getElementsByClassName("listFUTItem"));
  } else if (isUserOnUnassignedPage()) {
    const itemLists = Array.from(document.getElementsByClassName("itemList"));
    itemLists.forEach(function(itemList) {
      items = items.concat(
        Array.from(itemList.getElementsByClassName("listFUTItem"))
      );
    }, this);
  } else {
    const itemList = document.getElementsByClassName("itemList")[0];
    items = Array.from(itemList.getElementsByClassName("listFUTItem"));
  }

  return items;
}
