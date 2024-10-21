import "./style.css";
import {
  filterTermsByInitialLetter,
  getRandomTerms,
  filterWordsByType,
  getRandomWords,
} from "./functions.ts";
import { Wordlist } from "./json.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
  <div id="main-container">
<div class="main-content">
  <h1>The Devil's Dictionary</h1>
  <div id="buttonList">
  <button id="adjectivetype">Show Adjectives</button>
  <button id="nountype">Show Nouns</button>
  <button id="verbtype">Show Verbs</button>
  <button id="threewords">Get 1 Adjective, Noun, Verb</button>
  <input id="letterInput" type="text" maxlength="1" placeholder="Type A Letter" pattern="[A-Za-z]" title="Only letters allowed"/>
  <button id="searchLetter">Search by Letter</button>
  <button id="randomWord">Get A Random Word</button>
  </div>
   <div id="wordList"></div>
   </div>
<div class="content-top-left"></div>
<div class="content-bottom-left"></div>
<div class="content-top-right"></div>
<div class="content-bottom-right"></div>
<div class="content-outer-layer"></div>
<div class="content-inner-layer"></div>
<div class="content-wide-outer"></div>
<div class="content-wide-inner"></div>
  </div>
   </div>
   </div>
`;

//gets all adjectives
document
  .querySelector<HTMLButtonElement>("#adjectivetype")!
  .addEventListener("click", () => {
    const adjectives = filterWordsByType("adjective");
    displayWords(adjectives);
  });

//selects 1 random asjective, noun and verb
document
  .querySelector<HTMLButtonElement>("#threewords")!
  .addEventListener("click", () => {
    const getthreewords = getRandomWords();
    displayWords(getthreewords);
  });

//gets all nouns
document
  .querySelector<HTMLButtonElement>("#nountype")!
  .addEventListener("click", () => {
    const nouns = filterWordsByType("noun");
    displayWords(nouns);
  });

//gets all verbs
document
  .querySelector<HTMLButtonElement>("#verbtype")!
  .addEventListener("click", () => {
    const verbs = filterWordsByType("verb");
    displayWords(verbs);
  });

//looks up words that begin with a letter that the user puts in input
document
  .querySelector<HTMLButtonElement>("#searchLetter")!
  .addEventListener("click", () => {
    const inputElement =
      document.querySelector<HTMLInputElement>("#letterInput")!;
    let letter = inputElement.value.trim().toLowerCase();
    if (!/^[a-zA-Z]*$/.test(letter)) {
      letter = letter.replace(/[^a-zA-Z]/g, ""); // if input is not a letter, gets replaced with empty string
      inputElement.value = letter;
    }

    if (letter.length === 1) {
      // checks if letter is exactly 1 letter
      const filteredWords = filterTermsByInitialLetter(letter);
      displayWords(filteredWords);
    } else {
      alert("Please enter a single letter.");
      console.error("Please enter a single letter.");
    }
  });

//gets 1 random word
document
  .querySelector<HTMLButtonElement>("#randomWord")!
  .addEventListener("click", () => {
    const randomPick = getRandomTerms(1);
    displayWords(randomPick);
  });

function displayWords(
  words: Wordlist[] | { noun: Wordlist; verb: Wordlist; adjective: Wordlist } //accepts on array or object as is the case when the 3 words button is called
) {
  const wordListDiv = document.querySelector<HTMLDivElement>("#wordList")!;
  wordListDiv.innerHTML = "";

  if (Array.isArray(words)) {
    //checks if arguement is an array with words as content
    if (words.length === 0) {
      //checks if a word does not exist
      wordListDiv.innerHTML = "<p>No words found</p>";
    } else if (words.length === 1) {
      //checks if only 1 word is found when user types in put or if user selects random word
      const wordObj = words[0];

      //creates card section for the single word
      const cardElement = document.createElement("div");
      cardElement.classList.add("word-card");

      //creates shape of card
      const cardStyle = document.createElement("div");
      cardStyle.classList.add("cardShape");

      //sets up front of the card where it tells user to click to reveal word
      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const innerOutlineFront = document.createElement("div");
      innerOutlineFront.classList.add("inner-outline");
      innerOutlineFront.innerHTML = "<h2> Click to Reveal</h2>";

      //word and definition are on the back side
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.innerHTML = `<h2>${wordObj.term}</h2><p>${wordObj.definition}</p>`;

      //appends divs to apporitate parent
      cardFront.appendChild(innerOutlineFront);
      cardStyle.appendChild(cardFront);
      cardStyle.appendChild(cardBack);
      cardElement.appendChild(cardStyle);

      //event listener will activate 'flip' style which revelas word to user
      cardElement.addEventListener("click", () => {
        cardStyle.classList.toggle("flipped");
      });

      //adds everything to wordList so it can be displayed
      wordListDiv.appendChild(cardElement);
    } else {
      // for when user selects any of the Show buttons
      words.forEach((wordObj) => {
        const wordElement = document.createElement("p");
        wordElement.textContent = wordObj.term;

        const descriptionElement = document.createElement("span");
        descriptionElement.textContent = ` - ${wordObj.definition}`;
        descriptionElement.style.fontStyle = "italic";

        wordElement.appendChild(descriptionElement);
        wordListDiv.appendChild(wordElement);
      });
    }
  } else {
    // for when user selects 3 words button
    //same layout and style card as single card above but inlcuded the cards to be laid hortizontal on bug screen and vertical on smaller screen
    const cardList = document.createElement("div");
    cardList.classList.add("cardList");
    Object.entries(words).forEach(([wordType, wordObj]) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("word-card");

      const cardStyle = document.createElement("div");
      cardStyle.classList.add("cardShape");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const wordTypeHead = document.createElement("div");
      wordTypeHead.classList.add("inner-outline");
      wordTypeHead.innerHTML = `${wordType}`;

      const innerOutlineFront = document.createElement("div");
      innerOutlineFront.classList.add("inner-outline");
      innerOutlineFront.innerHTML = "<h2> Click to Reveal</h2>";

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.innerHTML = `<h2>${wordObj.term}</h2><p>${wordObj.definition}</p>`;

      cardFront.appendChild(innerOutlineFront);
      cardStyle.appendChild(cardFront);
      cardStyle.appendChild(cardBack);
      cardElement.appendChild(cardStyle);

      cardElement.addEventListener("click", () => {
        cardStyle.classList.toggle("flipped");
      });

      cardList.appendChild(cardElement);
      wordListDiv.appendChild(cardList);
    });
  }
}

