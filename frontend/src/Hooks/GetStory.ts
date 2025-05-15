export async function GetStory(id: number) {
    try {
        const res = await fetch(`http://localhost:3000/api/story/${id}`)
        if (!res.ok) {
            throw new Error('Something is wrong with the communication with the backend' + res.status);
        }
        const data = await res.json()
        console.log(data);
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