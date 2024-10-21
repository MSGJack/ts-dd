import { Wordlist, words } from "./json";

//filter by adjective, nouns, or verbs
export function filterWordsByType(type: string): Wordlist[] {
  return words.filter((word) => word.type === type);
}

//only gets words that begins with a certain letter
export function filterTermsByInitialLetter(letter: string): Wordlist[] {
  return words.filter((word) => word.term.startsWith(letter.toUpperCase()));
}

//randomly gets  one word from words
export function getRandomTerms(count: number): Wordlist[] {
  //suffles array
  const shuffledTerms = words.sort(() => Math.random() - 0.5);

  return shuffledTerms.slice(0, count);
}

//randomly gets 1 adjective, noun and verb
export function getRandomWords(): {
  noun: Wordlist;
  verb: Wordlist;
  adjective: Wordlist;
} {
  //suffles array
  const getRandomWord = (words: Wordlist[]): Wordlist => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const nouns = words.filter((word) => word.type === "noun");
  const verbs = words.filter((word) => word.type === "verb");
  const adjectives = words.filter((word) => word.type === "adjective");

  const randomNoun = getRandomWord(nouns);
  const randomVerb = getRandomWord(verbs);
  const randomAdjective = getRandomWord(adjectives);

  return {
    noun: randomNoun,
    verb: randomVerb,
    adjective: randomAdjective,
  };
}

const randomWords = getRandomWords();
console.log(
  `Noun: ${randomWords.noun.term} Definition: ${randomWords.noun.definition}`
);
console.log(
  `Verb: ${randomWords.verb.term} Definition: ${randomWords.verb.definition}`
);
console.log(
  `Adjective: ${randomWords.adjective.term} Definition: ${randomWords.adjective.definition}`
);

//const randomTerms = getRandomTerms(2);
//console.log("Randomly selected terms:", randomTerms);
