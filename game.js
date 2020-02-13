// Gameplay object which will manage our data and associate functions with said data

let gameplay = {
  rulesVisible: false,
  gameOverlay: "",
  //Is the overlay displaying currently?
  view: "",
  // State of guess
  guessed : false,
  //Quote retreived from API
  quote : "",
  //Player Stats Defined.
  players: {},
  //Current Player of the Game.
  currentPlayer : "",
  // Method to initialise the player and player data
  createPlayers: function(arr){
    for (let i = 0; i < arr[0]; i++) {
      this.players['Player ' + (i + 1)] = {"Lives" : arr[1]};
    };
    this.currentPlayer = 'Player 1';
  },
  //Method to get the current player's life.
  getCurrentLife : function(){
    return gameplay.players[gameplay.currentPlayer].Lives;
  },
  //Method to get quote and store into game
  getQuote : function(){
    const categories = [
      'inspire',
      'management',
      'sports',
      'life',
      'funny',
      'love',
      'art',
      'students'];
    let category = categories[(Math.floor(Math.random() * categories.length))];

    return fetch(`https://quotes.rest/qod.json?category=${category}`);


    // let quoteReq =  new Promise((resolve, reject) => {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open("GET", `http://quotes.rest/qod.json?category=${category}`, true);
    //   xhr.onload = function(){
    //     if (this.readyState == 4 && this.status == 200) {
    //       resolve(xhr.responseText);
    //     } else {
    //       reject("Error in accessing API.");
    //     }
    //   }
    //
    //   xhr.onerror = function(){
    //     reject("Could not reach server.")
    //   }
    //   xhr.send();
    // }) //End of Promise.
    //
    // quoteReq.then(
    //   (res) => {
    //     return new Promise((resolve, reject) => {
    //       resolve(newQuote = JSON.parse(res));
    //     })
    //   },
    //   (err) => console.log(err)
    // ).then((newQuote)=> gameplay.quote = '"' + (newQuote['contents']['quotes'][0]['quote']) + '"');

  },
  getAccent : function(){
    const accents = [
      'Asian',
      'Italian',
      'Eastern European',
      'Swedish',
      'Irish',
      'Italian NYC gangster',
      'Indian',
      'Kiwi',
      'Korean',
      'British',
      'Australian',
      'American',
      'Canadian',
      'Glaswegian',
      'Welsh',
      'French'];

    return accents[Math.floor(Math.random() * accents.length)].toUpperCase();
  },
  lifeCalc : function(){
    //If not guessed.
    if (!this.guessed) {
      this.players[this.currentPlayer].Lives = this.players[this.currentPlayer].Lives - 1;
    }
  },
  playerSwitch : function(){
    let player = (this.currentPlayer).split(' ');
    if (parseInt(player[1]) === (Object.keys(this.players).length)){
      player[1] = 1;
    } else {
      player[1] = parseInt(player[1]) + 1;
    }

    this.currentPlayer = player.join(" ");
  },
  playerOut : function(){
    let players = Object.keys(this.players);
    let newPlayers = {};

    // gameplay.players[player]["Lives"]
    players.forEach((player) =>{
      if (gameplay.players[player]["Lives"] !== 0) {
        newPlayers[player] = {"Lives" : gameplay.players[player]["Lives"]};
      }
      }
     )
     gameplay.players = newPlayers;
  }
}
