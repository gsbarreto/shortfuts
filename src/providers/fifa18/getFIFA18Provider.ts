import buyNow from './buyNow';
import comparePrice from './comparePrice';
import list from './list';
import Provider from '../Provider';
import quickSell from './quickSell';
import sendToTransferList from './sendToTransferList';
import storeInClub from './storeInClub';
import { log } from '../../utils/logger';

export default function getFIFA18Provider(): Provider {
    return {
        buyNow: buyNow,
        comparePrice: comparePrice,
        list: list,
        quickSell: quickSell,
        sendToTransferList: sendToTransferList,
        storeInClub: storeInClub
    };
}
