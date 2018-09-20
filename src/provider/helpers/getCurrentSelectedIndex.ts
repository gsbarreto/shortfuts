export default function getCurrentSelectedIndex(items) {
    return items.findIndex(item => {
        return item.className.indexOf('selected') > -1;
    });
}
