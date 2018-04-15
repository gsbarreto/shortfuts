export type Direction = 'up' | 'down';

export default interface Provider {
    back: () => void;
    buyBronzePack: () => void;
    buyNow: () => void;
    comparePrice: () => void;
    futbin: () => void;
    list: () => void;
    listMinBin: () => void;
    makeBid: () => void;
    move: (direction: Direction) => void;
    quickSell: () => void;
    quickSellAll: () => void;
    sendToTransferList: () => void;
    storeAllInClub: () => void;
    storeInClub: () => void;
    watch: () => void;
};
