export async function Follow(origin: number, target: number, action: boolean) {
    try {
        const data = { origin: origin, target: target, action: action };
        const fetchData = await fetch('http://localhost:3000/api/upd/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!fetchData.ok) throw new Error("Something is wrong with the fetch. " + fetchData.status);
        return await fetchData.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}