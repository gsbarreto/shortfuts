import back from './back';
import buyBronzePack from './buyBronzePack';
import buyNow from './buyNow';
import comparePrice from './comparePrice';
import futbin from './futbin';
import list from './list';
import listMinBin from './listMinBin';
import move from './move';
import Provider from '../Provider';
import quickSell from './quickSell';
import quickSellAll from './quickSellAll';
import sendToTransferList from './sendToTransferList';
import storeAllInClub from './storeAllInClub';
import storeInClub from './storeInClub';
import { log } from '../../utils/logger';

export default function getFIFA18Provider(): Provider {
    return {
        back: back,
        buyBronzePack: buyBronzePack,
        buyNow: buyNow,
        comparePrice: comparePrice,
        futbin: futbin,
        list: list,
        listMinBin: listMinBin,
        move: move,
        quickSell: quickSell,
        quickSellAll: quickSellAll,
        sendToTransferList: sendToTransferList,
        storeAllInClub: storeAllInClub,
        storeInClub: storeInClub
    };
}
