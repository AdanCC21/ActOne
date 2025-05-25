import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  BadWordsList: string[] = [
    "idiota", "imbécil", "estúpido", "pendejo", "cabron", "mierda", "puta",
    "puto", "putos", "putas", "gilipollas", "coño", "joder", "maldito", "perra", "zorra", "culero", "chingada",
    "chingar", "mierd@", "hdp", "hijo de puta", "maricon", "joto", "jotos", "maricones",
    "imbecil", "mamón", "pendeja", "cabrona", "chingadera", "chingón", "mierdoso",
    "malnacido", "bastardo", "idiotez", "imbecilidad", "pelotudo", "forro", "tarado",
    "tonto", "retrasado", "baboso", "animal", "bestia", "estupidez", "asqueroso",
    "lameculos", "arrastrado", "malparido", "zopenco", "nefasto", "mierdita",
    "pajero", "come mierda", "puta madre", "carajo", "verga", "vergazo", "chingadazo",
    "cabrón", "mierdón", "pendejazo", "pendejos", "soplapollas", "petardo", "cornudo", "güey",
    "babosa", "maldita", "coñazo", "pichón", "cachapera", "trolo", "marica",
    "culia@", "mierd*", "mamaguevo", "comeverga", "comemierda", "perr@", "zorr@", "marikón"
  ];


  StopWords: string[] = [
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

  interestingWords: string[] = [
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
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    const found: string[] = [];

    for (const word of words) {
      const baseWord = word.endsWith("s") ? word.slice(0, -1) : word;

      if (BadWordsSet.has(word) || BadWordsSet.has(baseWord)) {
        const badWord = BadWordsSet.has(word) ? word : baseWord;
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

  HaveInterestingWords(words: string[]) {
    const intWordSet = new Set(this.interestingWords);
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
}
