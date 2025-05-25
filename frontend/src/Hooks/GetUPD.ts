import { UpdateSession } from "./HandleSession";

export async function GetUPD(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/api/upd/get/by/id/${id}`);
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

export async function GetMultiplesUpd(idList: number[]) {
    const updList = await Promise.all(idList.map(async (current) => {
        const data = await GetUPD(current);
        return data;
    }));
    return updList
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

export async function UpdateUPD(upd: any) {
    try {
        const fetchData = await fetch('http://localhost:3000/api/upd/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: upd.id, data: upd })
        })
        if (!fetchData.ok) throw new Error('Fetch not ok. State: ' + fetchData.status);
        const data = await fetchData.json();
        if (!data.data) throw new Error(data.message);

        upd.user_name = data.data.user_name;
        upd.profile_image_url = data.data.profile_image_url;
        upd.description = data.data.description
        UpdateSession(upd);
        window.location.reload();

        return data.data;
    } catch (e) {
        console.error(e);
        return null
    }
}