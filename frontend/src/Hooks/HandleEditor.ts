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
    "mierda",
    "hdp",
    "hijo de puta",
    "maricon",
    "joto",
    "haro",
];

const StopWords: string[] = [
    "a", "y", "acá", "ahí", "al", "algo", "algunas", "algunos", "allá", "allí",
    "antes", "así", "aun", "aunque", "bien", "cada", "casi", "como", "con",
    "contra", "cual", "cuales", "cuando", "de", "del", "desde", "donde",
    "dos", "el", "él", "ella", "ellas", "ellos", "en", "entre", "era", "erais",
    "eran", "eras", "eres", "es", "esa", "esas", "ese", "eso", "esos", "esta",
    "estaba", "estaban", "estado", "estáis", "estamos", "están", "estar",
    "estas", "este", "esto", "estos", "estoy", "fue", "fueron", "fui", "fuimos",
    "ha", "había", "habían", "hace", "hacen", "hacer", "hacia", "hasta",
    "hay", "la", "las", "le", "les", "lo", "los", "más", "me", "mi", "mis",
    "mucho", "muy", "nada", "ni", "no", "nos", "nosotros", "nuestra",
    "nuestras", "nuestro", "nuestros", "o", "os", "otra", "otras", "otro",
    "otros", "para", "pero", "poco", "por", "porque", "que", "quien",
    "quienes", "se", "sea", "sean", "ser", "si", "sí", "sido", "sin", "sobre",
    "sois", "solamente", "solo", "somos", "son", "soy", "su", "sus", "también",
    "tampoco", "tan", "te", "tenéis", "tenemos", "tener", "tengo", "ti", "tiene",
    "tienen", "todo", "todos", "tu", "tus", "un", "una", "unas", "uno", "unos",
    "vosotras", "vosotros", "vuestra", "vuestras", "vuestro", "vuestros", "ya", "yo", "the", "of", "then", "they", "be", "will"
];

const interestingWords: string[] = [
    "infiel", "engaño", "traición", "pelea", "golpes", "gritos", "discusión",
    "chisme", "secreto", "engaños", "rumor", "problema", "crimen", "violencia",
    "accidente", "desastre", "escándalo", "llanto", "tristeza", "ira", "odio",
    "amor", "pasión", "celos", "envidia", "venganza", "rechazo", "vergüenza",
    "desprecio", "fracaso", "engañoso", "drama", "conflicto", "robo", "detención",
    "trauma", "abandono", "infidelidad", "ruptura", "misterio", "sorpresa",
    "impacto", "dolor", "locura", "obsesión", "culpa", "mentira", "adicción",
    "escándalos", "abusos", "pérdida", "tentación", "descontrol", "engañó",
    "fama", "revelación", "pánico", "traidor", "traiciono", "traicion", "abuso", "ilegal",
    "pecado", "pecar", "falso"
];


export function HandleSuggestions(text: string) {
    const ansewer = { maxWords: '', badWords: [''], wordMostUsed: [''], intWords: [''] };

    const maxWords = MaxWords(text, 200);
    if (maxWords.exceeds) ansewer.maxWords = "Maximo de palabras exedido. Cantidad :" + maxWords.wordsList.length;

    const badWords = HaveBadWords(text);
    badWords.length > 0 ? ansewer.badWords = badWords : ansewer.badWords = [''];

    if (maxWords.wordsList.length > 30) {
        const wordMostUsed = WordMostUsed(maxWords.wordsList);
        if (wordMostUsed != null) ansewer.wordMostUsed = ["La palabra mas usada es", wordMostUsed.palabra, ". Considera remarcarla si es algo importante."]
    }

    const intWords = HaveInterestingWords(maxWords.wordsList);
    intWords.length > 0 ? ansewer.intWords = intWords : ansewer.intWords = [''];

    return ansewer;
}

function HaveBadWords(text: string) {
    const BadWordsSet = new Set(BadWordsList);
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/);

    const found: string[] = [];
    for (const word of words) {
        if (BadWordsSet.has(word)) {
            if (!found.includes(word)) {
                found.push(word);
            }
        }
    }

    return found;
}

function MaxWords(text: string, max: number) {
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/);

    if (words.length > max) {
        return { exceeds: true, wordsList: words };
    }
    return { exceeds: false, wordsList: words };
}

function WordMostUsed(words: string[]): { palabra: string; cantidad: number } | null {
    const stopWordsSet = new Set(StopWords);
    const count: Record<string, number> = {};

    for (const word of words) {
        if (word === "" || stopWordsSet.has(word)) continue;
        count[word] = (count[word] || 0) + 1;
    }

    let maxPalabra = "";
    let maxCantidad = 0;

    for (const [palabra, cantidad] of Object.entries(count)) {
        if (cantidad > maxCantidad) {
            maxPalabra = palabra;
            maxCantidad = cantidad;
        }
    }

    return maxPalabra ? { palabra: maxPalabra, cantidad: maxCantidad } : null;
}

function HaveInterestingWords(words: string[]) {
    const intWordSet = new Set(interestingWords);
    let wordsList: string[] = [];
    for (const word of words) {
        if (intWordSet.has(word)) {
            if (!wordsList.includes(word)) {
                wordsList.push(word);
            }
        }
    }
    return wordsList;
}