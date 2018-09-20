const PREFIX = '[shortfuts]: ';

export function log(message: string) {
    console.log(`${PREFIX}${message}`);
}

export function logError(message: string) {
    console.error(`${PREFIX}${message}`);
    alert(message);
}
