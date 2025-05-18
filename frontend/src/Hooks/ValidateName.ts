export async function NameAlreadyUsed(name: string) {
    try {
        const fetchData = await fetch(`http://localhost:3000/api/upd/validate/name/${name}`);
        if (!fetchData.ok) throw new Error('Something is wrong with the backend');
        const data = await fetchData.json();
        return data.data;
    } catch (e) {
        console.error(e);
        return true;
    }
}