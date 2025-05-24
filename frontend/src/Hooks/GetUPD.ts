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

// export async function GetStoriesLiked(userId: number) {
//     try {
//         const fetchData = await fetch(`http://localhost:3000/api/stories/liked/${userId}`)
//         if (!fetchData.ok) throw new Error("Error on the fetch");
        
//         const data = await fetchData.json();
//         if (!data.data) throw new Error(data.message);
        
//         return data;
//     } catch (e) {
//         console.error(e);
//         return null;
//     }
// }