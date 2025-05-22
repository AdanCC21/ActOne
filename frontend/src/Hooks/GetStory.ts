export async function GetStory(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/api/story/${id}`)
        if (!res.ok) {
            throw new Error('Something is wrong with the communication with the backend' + res.status);
        }
        const data = await res.json()
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function GetStories() {
    try {
        const res = await fetch('http://localhost:3000/api/list/stories');
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'error desconocido');
        }
        return { message: "ok", data: data };
    } catch (e) {
        console.error(e.message);
        return { message: e.message, data: null };
    }
}

export async function SearchStory(value: string, filtro: string) {
    try {
        if (filtro === 'labels') {
            const data = { labels: value.split('/\s+/') };
            const fetchData = await fetch(`http://localhost:3000/api/search/${filtro}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            }
            );
            if (!fetchData.ok) throw new Error("Error with the featch: " + fetchData.status);
            return await fetchData.json();
        } else {
            const fetchData = await fetch(`http://localhost:3000/api/search/${filtro}/${value}`);
            if (!fetchData.ok) throw new Error("Error with the featch: " + fetchData.status);
            return await fetchData.json();
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}