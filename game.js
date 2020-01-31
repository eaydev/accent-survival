// Gameplay object which will manage our data and associate functions with said data

let gameplay = {
  quote : "",
  //Player Stats Defined.
  players: {
    'Player 1' : {Lives: 3},
    'Player 2' : {Lives: 1}
  },
  //Current Player of the Game.
  currentPlayer : 'Player 2',
  // Method to initialise the player and player data
  createPlayers: function(arr){
    for (let i = 0; i < arr[0]; i++) {
      this.players['Player ' + (i + 1)] = {"Lives" : arr[1]};
    };
    this.currentPlayer = 'Player 1';
  },
  //Method to get the current player's life.
  getCurrentLife : function(){
    return this.players[this.currentPlayer].Lives;
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

    //Create API Request
    let quoteRequest = new XMLHttpRequest();
      quoteRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log(category);
           let quote = JSON.parse(quoteRequest.responseText);
           gameplay.quote = '"' + (quote['contents']['quotes'][0]['quote']) + '"';
           console.log(gameplay.quote.length);
              }
    };
    quoteRequest.open("GET", `http://quotes.rest/qod.json?category=${category}`, true);
    quoteRequest.send();
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
    // console.log(accents[Math.floor(Math.random() * accents.length)].toUpperCase());

  }
}

//Main portion logic.

gameplay.getQuote();
setTimeout(function(){
  document.getElementById("playerID").innerHTML = gameplay.currentPlayer;
  //Controlling style for quote card regarding character length.
  if (gameplay.quote.length >= 85) {
    document.getElementById("quote").style.fontSize = "20px";
  } else if (gameplay.quote.length >= 250){
    document.getElementById("quote").style.fontSize = "25px";
  }
  document.getElementById("quote").innerHTML = gameplay.quote;
  document.getElementById("accent").innerHTML = gameplay.getAccent();
}, 3000)

//Timer Logic
