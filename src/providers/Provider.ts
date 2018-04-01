export default interface Provider {
    buyNow: () => void;
    comparePrice: () => void;
    list: () => void;
    listMinBin: () => void;
    quickSell: () => void;
    sendToTransferList: () => void;
    storeInClub: () => void;
};
