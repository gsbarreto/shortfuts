import back from './back';
import buyBronzePack from './buyBronzePack';
import buyNow from './buyNow';
import comparePrice from './comparePrice';
import decreaseMinBidPrice from './decreaseMinBidPrice';
import increaseMinBidPrice from './increaseMinBidPrice';
import list from './list';
import listMinBin from './listMinBin';
import makeBid from './makeBid';
import move from './move';
import pageNext from './pageNext';
import pagePrevious from './pagePrevious';
import Provider from './Provider';
import quickSell from './quickSell';
import quickSellAll from './quickSellAll';
import search from './search';
import sendToTransferList from './sendToTransferList';
import storeAllInClub from './storeAllInClub';
import storeInClub from './storeInClub';
import watch from './watch';

export default function getProvider(): Provider {
    return {
        back: back,
        buyBronzePack: buyBronzePack,
        buyNow: buyNow,
        comparePrice: comparePrice,
        decreaseMinBidPrice: decreaseMinBidPrice,
        increaseMinBidPrice: increaseMinBidPrice,
        list: list,
        listMinBin: listMinBin,
        makeBid: makeBid,
        move: move,
        pageNext: pageNext,
        pagePrevious: pagePrevious,
        quickSell: quickSell,
        quickSellAll: quickSellAll,
        search: search,
        sendToTransferList: sendToTransferList,
        storeAllInClub: storeAllInClub,
        storeInClub: storeInClub,
        watch: watch,
    };
}
