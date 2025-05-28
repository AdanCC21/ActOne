import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  BadWordsList: string[] = [
    // Insultos comunes
    "idiota", "imbécil", "imbecil", "estúpido", "estupido", "tonto", "tarado", "retrasado", "baboso", "babosa",
    "animal", "bestia", "pendejo", "pendeja", "pendejos", "pendejas", "pelotudo", "forro", "pajero", "pajera",
    "mamón", "mamona", "tont@", "weon", "huevón", "huevona", "bruto", "bruta",

    // Vulgaridades sexuales
    "puta", "puto", "putos", "putas", "perra", "perr@", "zorra", "zorr@", "cabron", "cabrón", "cabrona",
    "hijo de puta", "hdp", "hpta", "malparido", "malparida", "chinga tu madre", "chingadamadre", "chingada",
    "chingar", "chingón", "chingona", "chingadera", "chingadazo", "verga", "vergazo", "verguita", "vergon",
    "culero", "culera", "culia@", "culo", "culón", "culona", "culo roto", "culo abierto", "pito", "alv", "ctm", "hdsptm",
    "putito", "cagada", "cagar"

    // Homofobia y género
    , "maricón", "maricona", "maricon", "marikón", "marika", "joto", "jotos", "maricas", "maricones",
    "trolo", "cachapera", "comeverga", "mamaguevo", "tragapolla", "tragasables",

    // Palabras con símbolos
    "mierda", "mierd@", "mierd*", "mierdón", "mierdita", "comemierda", "come mierda", "lameculos", "comeverga",
    "puta madre", "putamadre", "coño", "coñazo", "carajo", "hostia", "joder", "mierdaza", "mierdero",

    // Variantes coloquiales o regionales
    "güey", "wey", "guey", "pichón", "boludo", "zopenco", "nefasto", "asqueroso", "asquerosa",
    "petardo", "cornudo", "arrastrado", "maldito", "maldita", "bastardo", "bastarda", "idiotez",
    "imbecilidad", "estupidez", "mamerto", "ñángara",

    // Frases o compuestos
    "vete a la mierda", "me cago en ti", "me cago en tu madre", "vete al carajo", "chingate esta",
    "me la pelas", "te parto tu madre", "te voy a romper tu madre", "pinche pendejo", "maldito imbécil",
    "malnacido", "bicho", "perra asquerosa", "basura humana", "muérete", "ojalá te mueras", "inútil",

    // Censurados comunes
    "p3nd3jo", "p3ndejo", "hdpm", "c4brón", "imb3cil", "estúp1do", "z0rra", "z0rr@", "pvt@", "m4món",
    "v3rg4", "v3rg@", "m13rd@", "ch1ng@", "g3y", "m4rica"
  ];


  StopWords: string[] = [
    // Artículos
    "el", "la", "los", "las", "un", "una", "unos", "unas",

    // Pronombres personales
    "yo", "tú", "vos", "usted", "él", "ella", "nosotros", "nosotras",
    "vosotros", "vosotras", "ustedes", "ellos", "ellas",

    // Posesivos
    "mi", "mis", "tu", "tus", "su", "sus", "nuestro", "nuestra", "nuestros", "nuestras",
    "vuestro", "vuestra", "vuestros", "vuestras",

    // Verbos auxiliares y conjugaciones de ser/estar/haber
    "soy", "eres", "es", "somos", "sois", "son",
    "era", "eras", "éramos", "erais", "eran", "fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron",
    "ser", "sea", "seas", "seamos", "seáis", "sean",
    "estoy", "estás", "está", "estamos", "estáis", "están",
    "estaba", "estabas", "estábamos", "estabais", "estaban",
    "estar", "esté", "estés", "estemos", "estéis", "estén",
    "he", "has", "ha", "hemos", "habéis", "han",
    "había", "habías", "habíamos", "habíais", "habían",
    "haya", "hayas", "hayamos", "hayáis", "hayan",
    "habré", "habrás", "habrá", "habremos", "habréis", "habrán",
    "hay", "hubo", "hubiera", "hubiese",

    // Verbos comunes
    "tener", "tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen",
    "hacer", "hago", "haces", "hace", "hacemos", "hacéis", "hacen",
    "ir", "voy", "vas", "va", "vamos", "vais", "van",
    "puedo", "puedes", "puede", "podemos", "podéis", "pueden",
    "quiero", "quieres", "quiere", "queremos", "queréis", "quieren",

    // Conjunciones
    "y", "o", "u", "pero", "aunque", "ni", "que", "si", "como", "porque", "ya que", "pues", "sin embargo",

    // Preposiciones
    "a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "en", "entre",
    "hacia", "hasta", "mediante", "para", "por", "según", "sin", "so", "sobre", "tras",

    // Adverbios y determinantes comunes
    "aquí", "allí", "ahí", "acá", "allá", "así", "bien", "mal", "muy", "más", "menos", "nada",
    "algo", "todo", "casi", "siempre", "nunca", "jamás", "ya", "todavía", "aún", "también", "tampoco",
    "solo", "solamente", "demasiado", "bastante", "pronto", "luego", "antes", "después", "ahora", "entonces",

    // Interrogativos y relativos
    "qué", "quién", "quiénes", "cual", "cuál", "cuáles", "cuándo", "cómo", "dónde", "por qué", "para qué",
    "que", "quien", "cuyo", "cuyos", "cuyas", "cualquiera",

    // Indefinidos y cuantificadores
    "alguien", "nadie", "alguno", "alguna", "algunos", "algunas", "ninguno", "ninguna", "varios", "varias",
    "mucho", "mucha", "muchos", "muchas", "poco", "poca", "pocos", "pocas", "demasiado", "tanto", "tantos",

    // Otros
    "lo", "le", "les", "se", "me", "te", "nos", "os", "sí", "no", "eso", "estos", "esas", "esa", "este", "esta", "aquello", "aquella","habia",

    // Contracciones
    "al", "del",

    // Inglés básico (opcional)
    "the", "a", "an", "of", "and", "or", "but", "so", "if", "in", "on", "at", "by", "from", "with", "about",
    "then", "that", "this", "these", "those", "is", "are", "was", "were", "be", "being", "been",
    "has", "have", "had", "will", "would", "shall", "should", "can", "could", "may", "might",
    "do", "does", "did", "doing", "to", "as", "for", "not", "just", "very", "it's", "i'm", "you're", "they're"
  ];


  interestingWords: string[] = [
    // Relaciones y emociones intensas
    "infiel", "infidelidad", "engaño", "engañó", "engañar", "traición", "traicionó", "traiciona", "traidor",
    "ruptura", "separación", "rechazo", "abandono", "desprecio", "vergüenza", "culpa", "mentira", "mentiras",
    "odio", "ira", "rencor", "resentimiento", "celos", "envidia", "venganza", "desamor", "confusión", "engañoso",
    "loca", "loco","traicion"

    // Escándalos y conflictos
    , "escándalo", "escándalos", "chisme", "chismes", "rumor", "rumores", "secreto", "secretos",
    "revelación", "sorpresa", "impacto", "acusación", "acusaciones", "fama", "polémica", "bochorno",

    // Violencia y crimen
    "golpes", "pelea", "peleas", "gritos", "discusión", "conflicto", "problema", "problemas", "crimen",
    "crímenes", "robo", "robar", "asalto", "violencia", "abuso", "abusos", "maltrato", "ilegal", "detención",
    "arresto", "captura", "fuga", "amenaza", "terror", "pánico", "miedo", "asesinato", "muerto", "muerte", "homicidio",

    // Drama y emociones negativas
    "drama", "trauma", "locura", "obsesión", "adicción", "adicto", "dolor", "tristeza", "llanto", "descontrol",
    "depresión", "fracaso", "perdida", "pérdida", "soledad", "nostalgia", "vacío", "duda", "temor",

    // Temas sexuales o controversiales
    "tentación", "pecado", "pecar", "lujuria", "seducción", "enganche", "cama", "sexual", "pasión", "romance",

    // Otros temas interesantes
    "misterio", "accidente", "desastre", "incendio", "colapso", "tragedia", "error", "falso", "fingir",
    "rumores", "engaños", "manipulación", "estrategia", "escándalo", "infame", "sospechoso", "encubrimiento",
    "delito", "corrupción", "chantaje", "extorsión", "vulnerabilidad", "crisis", "engaños", "mentiroso",

    // Sentimientos opuestos (para riqueza emocional)
    "amor", "enamoramiento", "pasión", "ternura", "ilusión", "esperanza", "cariño", "devoción",
    "traición", "odio", "frialdad", "distancia", "desapego"
  ];



  HandleSuggestions(text: string) {
    const ansewer = { maxWords: '', badWords: [''], wordMostUsed: [''], intWords: [''] };

    const maxWords = this.MaxWords(text, 200);
    if (maxWords.exceeds) ansewer.maxWords = "Maximo de palabras exedido. Cantidad :" + maxWords.wordsList.length;

    const badWords = this.HaveBadWords(text);
    badWords.length > 0 ? ansewer.badWords = badWords : ansewer.badWords = [''];

    if (maxWords.wordsList.length > 30) {
      const wordMostUsed = this.WordMostUsed(maxWords.wordsList);
      if (wordMostUsed != null) ansewer.wordMostUsed = ["La palabra mas usada es", wordMostUsed.palabra, ". Considera remarcarla si es algo importante."]
    }

    const intWords = this.HaveInterestingWords(maxWords.wordsList);
    intWords.length > 0 ? ansewer.intWords = intWords : ansewer.intWords = [''];

    return { data: ansewer };
  }

  HaveBadWords(text: string): string[] {
    const BadWordsSet = new Set(this.BadWordsList.map(word => word.toLowerCase()));

    const normalizeWord = (word: string): string => {
      // Reduce repeticiones de letras: "putoooooo" → "puto"
      return word.replace(/(\w)\1{1,}/g, "$1");
    };

    const cleanText = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    const found: string[] = [];

    for (let word of cleanText) {
      const normalized = normalizeWord(word);
      const baseWord = normalized.endsWith("s") ? normalized.slice(0, -1) : normalized;

      if (BadWordsSet.has(normalized) || BadWordsSet.has(baseWord)) {
        const badWord = BadWordsSet.has(normalized) ? normalized : baseWord;
        if (!found.includes(badWord)) {
          found.push(badWord);
        }
      }
    }

    return found;
  }



  MaxWords(text: string, max: number) {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    if (words.length > max) {
      return { exceeds: true, wordsList: words };
    }
    return { exceeds: false, wordsList: words };
  }

  WordMostUsed(words: string[]): { palabra: string; cantidad: number } | null {
    const stopWordsSet = new Set(this.StopWords);
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

  HaveInterestingWords(words: string[]): string[] {
    const intWordSet = new Set(this.interestingWords.map(word => word.toLowerCase()));

    const normalizeWord = (word: string): string =>
      word
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/(\w)\1{1,}/g, "$1");

    const found: string[] = [];

    for (const word of words.map(normalizeWord)) {
      if (intWordSet.has(word) && !found.includes(word)) {
        found.push(word);
      }
    }

    return found;
  }
}
