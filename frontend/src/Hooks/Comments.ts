export async function GetComments(storyId: number) {
    try {
        const fetchData = await fetch(`http://localhost:3000/api/pd/comments/get/${storyId}`);
        if (!fetchData.ok) throw new Error('Something is wrong with the backend. Status: ' + fetchData.status);
        return await fetchData.json();
    } catch (e) {
        console.error(e.message);
        return []
    }
}

export async function SubmitComment(userId: number, storyId: number, content: string) {
    try {
        const sendComment = await fetch('http://localhost:3000/api/pd/comment/post', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ userId: userId, pubId: storyId, content: content })
        })
        if (!sendComment.ok) throw new Error('Something is wrong with the backend');
        
        return await sendComment.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}