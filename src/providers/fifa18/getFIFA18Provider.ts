import buyBronzePack from './buyBronzePack';
import buyNow from './buyNow';
import comparePrice from './comparePrice';
import list from './list';
import listMinBin from './listMinBin';
import Provider from '../Provider';
import quickSell from './quickSell';
import sendToTransferList from './sendToTransferList';
import storeInClub from './storeInClub';
import { log } from '../../utils/logger';

export default function getFIFA18Provider(): Provider {
    return {
        buyBronzePack: buyBronzePack,
        buyNow: buyNow,
        comparePrice: comparePrice,
        list: list,
        listMinBin: listMinBin,
        quickSell: quickSell,
        sendToTransferList: sendToTransferList,
        storeInClub: storeInClub
    };
}
