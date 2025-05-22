export async function PostLike(userId: number, pubId: number, pubType: string) {
    // Empujar el id de la publicacion a el UPD del usuario actual,
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

export async function Report(userId: number, pubId: number) {
    try {
        console.log("entro")
        const sendData = await fetch('http://localhost:3000/api/pd/report', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId, pubId: pubId })
        })

        if (!sendData.ok) throw new Error('Something is wrong in the fetch. Status: ' + sendData.status);

        const data = await sendData.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}