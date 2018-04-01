export default interface Provider {
    buyBronzePack: () => void;
    buyNow: () => void;
    comparePrice: () => void;
    list: () => void;
    listMinBin: () => void;
    quickSell: () => void;
    sendToTransferList: () => void;
    storeInClub: () => void;
};
