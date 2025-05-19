import { E_Act } from "../entities/Act.entity"

export async function SubmitStory(title, userId, act,) {
    try {
        const story = {
            title: title,
            author_id: Number(userId),
            synopsis: act[0].content,
            visibility: true,
        }
        const acts = act.map((current) => { return { title: current.title, content: current.content } })
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
        if (result.data !== undefined) return true;

    } catch (e) {
        console.error(e.message);
        return false;
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

const BadWordsList: string[] = [
    "idiota",
    "imbécil",
    "estúpido",
    "pendejo",
    "cabron",
    "mierda",
    "puta",
    "puto",
    "gilipollas",
    "coño",
    "joder",
    "maldito",
    "perra",
    "zorra",
    "culero",
    "chingada",
    "chingar",
    "mierd@",
    "hdp",
    "hijo de puta"
];

export function HandleSuggestions(text: string) {
    const wordsAmount = MaxWords(text, 200);
}

function MaxWords(text, max) {
    const palabras = text.trim().split(/\s+/);
    if (palabras > max) {
        return ``
    }
}

function PalabraMasUsada(texto: string): { palabra: string; cantidad: number } | null {
    const palabras = texto
        .toLowerCase()                  // ignorar mayúsculas
        .replace(/[^\w\s]/g, "")        // eliminar puntuación
        .split(/\s+/);                  // separar por espacios

    const conteo: Record<string, number> = {};

    for (const palabra of palabras) {
        if (palabra === "") continue;
        conteo[palabra] = (conteo[palabra] || 0) + 1;
    }

    let maxPalabra = "";
    let maxCantidad = 0;

    for (const [palabra, cantidad] of Object.entries(conteo)) {
        if (cantidad > maxCantidad) {
            maxPalabra = palabra;
            maxCantidad = cantidad;
        }
    }

    return maxPalabra ? { palabra: maxPalabra, cantidad: maxCantidad } : null;
}