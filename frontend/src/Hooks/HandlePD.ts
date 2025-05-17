export async function PostLike(userId: number, pubId: number, pubType: string) {
    try {
        const sendData = await fetch('http://localhost:3000/api/pd/like', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId, pubId: pubId, pubType: pubType })
        })

        if (!sendData.ok) throw new Error('Something is wrong in the fetch. Status: ' + sendData.status);

        const data = await sendData.json();
        return data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}