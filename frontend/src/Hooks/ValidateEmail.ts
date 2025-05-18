export async function EmailInUse(emial: string) {
    try {
        const fetchData = await fetch(`http://localhost:3000/api/email/used/${emial}`);
        if(!fetchData.ok) throw new Error('Something is wrong with the fetch');
        const data = await fetchData.json();
        return data.data;
    }
    catch (e) {
        console.error(e);
        return true;
    }
}