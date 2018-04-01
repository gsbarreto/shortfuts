export default interface Provider {
    buyNow: () => void;
    comparePrice: () => void;
    quickSell: () => void;
    sendToTransferList: () => void;
    storeInClub: () => void;
};
