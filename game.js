// Gameplay object which will manage our data and associate functions with said data

let gameplay = {
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
  }
}

let countDown;
let currentNumber = 3;
//Upon loading this count-down page we will initiate the animation starter
function iterateCount(){
  if(currentNumber === 0){
    stopIterate();
    console.log('STOPPED!');
    return document.getElementById('App').innerHTML =
    ``;
  }
  document.getElementById('App').innerHTML =
  `<h1 id="count" class="black count-header text-white count-anim">${currentNumber}</h1>`;
  currentNumber--;
}

function stopIterate(){
  clearInterval(countDown);
}

(function(){
  document.getElementById('App').innerHTML =
  `<h1 id="count" class="black count-header text-white count-anim">${currentNumber}</h1>`;
  currentNumber--;
  countDown = setInterval(iterateCount, 1200);
})();
