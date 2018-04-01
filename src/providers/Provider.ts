export type Direction = 'up' | 'down';

export default interface Provider {
    back: () => void;
    buyBronzePack: () => void;
    buyNow: () => void;
    comparePrice: () => void;
    futbin: () => void;
    list: () => void;
    listMinBin: () => void;
    move: (direction: Direction) => void;
    quickSell: () => void;
    sendToTransferList: () => void;
    storeInClub: () => void;
};
