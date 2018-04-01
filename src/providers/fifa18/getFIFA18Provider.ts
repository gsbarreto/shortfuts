import Provider from '../Provider';
import { log } from '../../utils/logger';

export default function getFIFA18Provider(): Provider {
    return {
        storeInClub: () => {
            log('Storing item in club...');
        }
    };
}
