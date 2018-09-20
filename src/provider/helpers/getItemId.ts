export default function getItemId(item) {
    try {
        const imageSrc = item.getElementsByClassName('photo')[0].currentSrc;
        const lastIndexOfSlash = imageSrc.lastIndexOf('/');
        const id = imageSrc.substring(
            lastIndexOfSlash + 1,
            imageSrc.length - 4
        );
        return id;
    } catch (error) {
        throw 'Unable to get item ID.';
    }
}
