import Provider from '../Provider';
import storeInClub from './storeInClub';
import { log } from '../../utils/logger';

export default function getFIFA18Provider(): Provider {
    return {
        storeInClub: storeInClub
    };
}
