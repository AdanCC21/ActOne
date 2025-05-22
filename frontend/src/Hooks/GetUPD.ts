export async function GetUPD(id: number) {
    try {
        console.log(id);
        const res = await fetch(`http://localhost:3000/api/upd/get/by/id/${id}`);
        if (!res.ok) {
            throw new Error('Something is wrong with the GetUser Function');
        }

        const data = await res.json();
        if (!data) {
            throw new Error('User not found');
        }
        console.log(data);
        return data.data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

export async function GetUPDByName(name: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/upd/get/by/name/${name}`);
        if (!res.ok) {
            throw new Error('Something is wrong with the GetUser Function');
        }

        const data = await res.json();
        if (!data) {
            throw new Error('User not found');
        }
        return data.data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}