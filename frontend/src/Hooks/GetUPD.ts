export async function GetUPD(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/api/upd/get/${id}`);
        if (!res.ok) {
            throw new Error('Something is wrong with the GetUser Function');
        }

        const data = await res.json();
        if (!data) {
            throw new Error('User not found');
        }
        return data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}