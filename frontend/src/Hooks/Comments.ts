import { GetUPD } from "./GetUPD";

/**
 * 
 * @param storyId 
 * @returns [{comment:comment, upd:userUpd}] || []
 */
export async function GetComments(storyId: number) {
    try {
        const fetchData = await fetch(`http://localhost:3000/api/pd/comments/get/${storyId}`);
        if (!fetchData.ok) throw new Error('Something is wrong with the backend. Status: ' + fetchData.status);

        const commentsFetch = await fetchData.json();
        if (!commentsFetch.data) throw new Error(commentsFetch.message);

        const commentList = await Promise.all(commentsFetch.data.map(async (current, index) => {
            const updComment = await GetUPD(current.user_id);
            return { comment: commentsFetch.data[index], upd: updComment }
        }))
        return commentList
    } catch (e) {
        console.error(e.message);
        return []
    }
}

/**
 * 
 * @param userId 
 * @param storyId 
 * @param content 
 * @returns {message:string, data:the new comment || null}
 */
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
        const data = await sendComment.json()
        if (!data.data) throw new Error(data.message);

        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}