class Shrugman {
    constructor() {
      this.shrug = "¯\\_(:/)_/¯";
      this.countWrong = 0;
      this.guessedLetters = [];
      this.gamesPlayed = [];
      this.wordsPlayed = [];
    }
  
    getWord(category) {

      if (this.wordsPlayed.length === category.length) this.wordsPlayed = [];
      const getRandom = () => Math.floor(Math.random() * category.length);
      let random = getRandom();
      while (this.wordsPlayed.includes(random)) {
        random = getRandom();
      }
      this.wordsPlayed.push(random);
      return category[random];
    }
  
    
    mask(word) {
      let arr = word.split("");
      let newArr=[]
      // for (let [index, char] of arr.entries()) {
      //   if (char !== " ") {
      //     arr[index] = "_";
      //   }
      // } other version 
      for (let letter of arr) {
        if (letter === ' ') {
          newArr.push(' ')
        } 
        newArr.push('_')
      }
      return newArr.join("");
    }
  
    unmask(word, masked, letter) {
      let arr = masked.split("");
      for (let [index, char] of word.split("").entries()) {
        if (char.toLowerCase() === letter.toLowerCase()) {
          arr[index] = word[index];
        }
      }
      return arr.join("");
    }
  
    draw(word, letter) {
      let letterLower = letter.toLowerCase();
      let wordLower = word.toLowerCase();
  
      let str = this.shrug.slice(0, this.countWrong);
  
      if (this.guessedLetters.includes(letterLower)) {
        let space = 14 - str.length;
        let hint = `You tried this ${letterLower} already`;
        return (
          str +
          (this.countWrong >= 10 ? "" : hint.padStart(space + hint.length, " "))
        );
      }
      this.guessedLetters.push(letterLower);
  
      if (!wordLower.includes(letterLower)) {
        this.countWrong++;
      }
      str = this.shrug.slice(0, this.countWrong);
      return str;
    }
  
    playAgainReset() {
      this.countWrong = 0;
      this.guessedLetters = [];
    }
  
    getGamesList() {
      return this.gamesPlayed.map((item, index) => `${index + 1}. ${item}`).join("\n");
    }
  }
  
  module.exports = Shrugman;