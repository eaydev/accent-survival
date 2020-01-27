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
           let quote = JSON.parse(quoteRequest.responseText);
           this.quote = (quote['contents']['quotes'][0]['quote']);
           console.log(this.quote);
        }
    };
    quoteRequest.open("GET", `http://quotes.rest/qod.json?category=${category}`, true);
    quoteRequest.send();
      }
}

let countDown;
let currentNumber = 3;

//Function that facilitates DOM appearance and quote retreival for countdown
function iterateCount(){
  if(currentNumber === 0){
    stopIterate();
    return document.getElementById('App').innerHTML =
    `<div class="loader"></div>`;
  }
  document.getElementById('App').innerHTML =
  `<h1 id="count" class="black count-header text-white count-anim">${currentNumber}</h1>`;
  currentNumber--;
}
//Clear Interval for Counter
function stopIterate(){
  clearInterval(countDown);
}

//Upon loading this count-down page we will initiate the animation starter
(function(){
  gameplay.getQuote();
  document.getElementById('App').innerHTML =
  `<h1 id="count" class="black count-header text-white count-anim">${currentNumber}</h1>`;
  currentNumber--;
  //Start the counter in the called variable so can call
  countDown = setInterval(iterateCount, 1200);

})();
