const starterScreen = {
  preRender : function(){
    return
      `<!-- Start of hero -->

      <div class="starter-hero">
        <img class="brand-logo" src="assets/communication.svg" alt="Accent Survival Logo: An arrow piercing two speech bubbles.">
        <div class="starter-hero-header black text-white">
          <h1>Accent Survival</h1>
        </div>
        <p class="text-white sub-text">The accent guessing survival game.</p>
      </div>

      <!-- end of hero -->

      <!-- start of form -->

      <form id="starter-form">
        <div containerFor="numberOfPlayers" class="form-line button button-orange">
          <label for="numberOfPlayers">Players: </label>
          <select name="numberOfPlayers" id="numberOfPlayers" class="border-none">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div containerFor="numberOfLives" class="form-line button button-red">
          <label for="numberOfLives">Lives: </label>
          <select name="numberOfLives" id="numberOfLives" class="border-none">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <button class="button button-large button-green">Start</button>
      </form>

      <!-- end of form -->`
  },
  postRender : function(){
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
        gameplay.createPlayers(playerData);
      } //Processing block for submit end.
    })
  }
}
