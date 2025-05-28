import { E_Act } from "../entities/Act.entity"

export async function SubmitStory(title, userId, act, labels, visibility) {
    try {
        let duration = "Short";
        if (act.length >= 3) {
            if (act.length >= 6) {
                duration = "Large";
            }
            duration = "Medium";
        }

        const story = {
            title: title,
            author_id: Number(userId),
            synopsis: act[0].content,
            labels: labels,
            duration: duration,
            visibility: visibility,
        }
        const acts = act.map((current) => { return { title: current.title, content: current.content, act_number: current.act_number } })
        const data = {
            story: story,
            acts: acts
        }

        const res = await fetch('http://localhost:3000/api/story/publish', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error('Something is wrong with the backend');
        }
        const result = await res.json();
        if (!result.data) throw new Error(result.message);

        console.log(result);
        return result.data
    } catch (e) {
        console.error(e);
        return null;
    }
}

export function deleteAct(act, setAct: any, index: number, currentAct, setCurrent) {
    if (act.length > 1) {
        setAct(prev => {
            if (currentAct === index) {
                setCurrent(0)
            } else if (currentAct > index) {
                setCurrent(index);
            }
            const newAct = prev.filter((_, i) => i !== index);
            return newAct;
        });
    }
};

export function addAct(setAct: any, setCurrent) {
    setAct(prev => {
        const newAct = [...prev, new E_Act(prev.length)];
        setCurrent(newAct.length - 1);
        return newAct;
    });
}

// --------------------------- SUGERENCIAS ---------------------------
export async function HandleSuggestions(text: string) {
    try {
        const fetchData = await fetch('http://localhost:3000/api/edit/suggestions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        })
        if (!fetchData.ok) throw new Error("Error in the fetch");
        const data = await fetchData.json();
        return data.data;
    } catch (e) {
        console.error(e);
        return { maxWords: '', badWords: [''], wordMostUsed: [''], intWords: [''] };
    }
}