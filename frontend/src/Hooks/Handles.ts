export function HandleKey(event: any, work: () => void) {
    if (event.key === 'Enter') {
        work();
    }
}

