import { E_UPD } from "../entities/UPD.entity";

/**
 * 
 * @param userId 
 * @param pubId 
 * @param pubType 
 * @param upd 
 * @returns the pd && upd data || null
 */
export async function PostLike(userId: number, pubId: number, pubType: string, upd: E_UPD) {
    try {
        const sendData = await fetch('http://localhost:3000/api/pd/like', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pd: { userId: userId, pubId: pubId, pubType: pubType }, upd: upd })
        })

        if (!sendData.ok) throw new Error('Something is wrong in the fetch. Status: ' + sendData.status);

        const data = await sendData.json();
        return data.data;
    } catch (e) {
        console.error(e.message);
        return null;
    }
}

/**
 * Stories liked by the user
 * @param userId 
 * @returns storiesLiked || null
 */
export async function GetLikes(userId: number) {

}

export async function IsPubLiked(userId: number, pubId: number) {

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