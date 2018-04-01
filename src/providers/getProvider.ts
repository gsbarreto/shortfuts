import getFIFA18Provider from './fifa18/getFIFA18Provider';
import Provider from './Provider';
import { log } from '../utils/logger';

// Returns the appropriate provider based on the user's version of the game.
export default function getProvider(): Provider {
    const fifaVersion = getFIFAVersion();

    switch (fifaVersion) {
        case 18:
            log('Fetching FIFA 18 provider.');
            return getFIFA18Provider();
        default:
            log('Fetching default (FIFA 18) provider.');
            return getFIFA18Provider();
    }
}

/**
 * Determines version of FIFA based on URL. This will have to be revisited
 * when FIFA 19 comes out and web app is released.
 */
function getFIFAVersion() {
    const path = window.document.location.pathname;

    if (path.indexOf('fifa/ultimate-team/web-app') > -1) {
        return 18;
    }

    // Assume newest version.
    return 18;
}
