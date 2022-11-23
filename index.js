const prompt = require("prompt-sync")({ sigint: true });
const Shrugman = require("./class");
const categories = require("./categories");

const shrugman = new Shrugman();

console.clear();
let cat = prompt("Choose category: movies or books or programming ");

while (!categories.hasOwnProperty(cat)) {
  console.clear();
  console.log("Error, please choose right category") 
  cat = prompt(`Choose category: ${"movies"} or ${"books"}  or ${'programming'} `);
}

function start() {
  console.clear();
  const word = shrugman.getWord(categories[cat]);
  console.clear();


  let masked = shrugman.mask(word);
  console.log(masked);
  console.log();

  let wordUnmasking = masked;
  let choosed = "";

  while (wordUnmasking.includes("_")) {
    if (shrugman.countWrong >= 10) {
      shrugman.gamesPlayed.push(word + " - loss");
      console.clear();
      console.log(word);
      console.log(choosed);
      console.log(`More luck next time!`);
      break;
    }

    let guess = prompt("Guess letter: ");
    console.clear();

    while (guess.length !== 1) {
      console.log('Please enter only one letter')
      console.log(wordUnmasking);

      console.log(choosed);

      guess = prompt("Guess letter: ");
      console.clear();
    }

    wordUnmasking = shrugman.unmask(word, wordUnmasking, guess);

    console.log(wordUnmasking);

    choosed = shrugman.draw(word, guess);
    console.log(choosed);
  }

  if (shrugman.countWrong < 10) {
    shrugman.gamesPlayed.push(word + " - win");
    console.log(`Congratulations, You win!`);
  }
}

start();

function getAnswer(again) {
  while (again !== "y" && again !== "n") {
    console.clear();
    console.log();
    console.log(shrugman.shrug);
    console.log();
    again = prompt(`Play again (${"y"}/${"n"})? `);
  }
  return again;
}

let again = prompt("Play again (y/n)? ");
again = getAnswer(again);

while (again === "y") {
  shrugman.playAgainReset();
  start();
  again = prompt("Play again (y/n)? ");
  again = getAnswer(again);
}

console.clear();
console.log("Thanks for playing");
console.log(shrugman.getGamesList());
console.log();


