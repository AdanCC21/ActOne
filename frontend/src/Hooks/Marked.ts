export async function MarkStory(storyId: number, userId: number) {
    try {
        const fetchData = await fetch('http://localhost:3000/api/upd/mark/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ storyId: storyId, userId: userId})
        })
        if (!fetchData.ok) throw new Error('Something is wrong with the backend. Satus' + fetchData.status);

        const data = await fetchData.json();
        return data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

export async function GetMarkCount(storyId: number) {
    try {
        const fetchData = await fetch(`http://localhost:3000/api/upd/mark/get/${storyId}`)
        if (!fetchData.ok) throw new Error('Something is wrong with the backend. Satus' + fetchData.status);
        
        const data = await fetchData.json();
        if (!data) return 0;
        
        return data.length;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}