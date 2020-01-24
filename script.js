// Gameplay object which will manage our data and associate functions with said data

let gameplay = {
  playerNo : 0,
  playerLife : 0,
  playerStats: {},
  initData : function(array){
    this.playerNo = array[0];
    this.playerLife = array[1];
    this.createPlayers();
  },
  createPlayers: function(){
    for (let i = 0; i < this.playerNo; i++) {
      this.playerStats['Player ' + (i + 1)] = {"Lives" : this.playerLife};
    }
    alert('Functioning');
  }

}

// function for submitting of start form

document.getElementById("starter-form").addEventListener('click', function(e){
  //Start of submit processing block
  if(e.target.classList.contains("button-green")){
    //Check if submit button
    e.preventDefault();
    let playerData = [];

    //Grab data and add to playerData array
    for (let i = 0; i < e.target.parentNode.elements.length - 1; i++) {
      playerData.push(parseInt(e.target.parentNode.elements[i].value));
    }

    //Pushing data into our state manager.
    //This will also create our players and their data.
    //Refer to gameplay, which acts as the model

    gameplay.initData(playerData);
  } //Processing block for submit end.
})
