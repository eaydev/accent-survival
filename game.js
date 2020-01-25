// Gameplay object which will manage our data and associate functions with said data

let gameplay = {
  //Player Stats Defined.
  players: {
    'Player 1' : {Lives: 3},
    'Player 2' : {Lives: 3}

  },
  //Current Player of the Game.
  currentPlayer : 'Player 2',
  // Method to initialise the player and player data
  createPlayers: function(arr){
    for (let i = 0; i < arr[0]; i++) {
      this.players['Player ' + (i + 1)] = {"Lives" : arr[1]};
    };
    this.currentPlayer = 'Player 1';
  }
}

function initPlayer(){
  // document.getElementById('playerDisplay').innerHTML = gameplay.currentPlayer;
    console.log("Ready");
}
