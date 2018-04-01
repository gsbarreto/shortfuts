export default interface Provider {
    buyNow: () => void;
    comparePrice: () => void;
    list: () => void;
    quickSell: () => void;
    sendToTransferList: () => void;
    storeInClub: () => void;
};
