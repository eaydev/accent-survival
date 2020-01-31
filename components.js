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


const intermediaryScreen = {
  preRender : function(){
    return
    `<div class="intermediary-header">
      <h1 id="playerDisplay" class="starter-hero-header text-white black" style="padding-bottom: 20px; letter-spacing: 0.035em;">
        Player 1
      </h1>
      <p class="semi-bold text-white underline">Lives: <span id="playerLife">2</span></p>
    </div>
    <button class="button button-large button-orange">Let's go</button>`;
  },
  postRender : function(){
    //Pull data from Object to be displayed in DOM
      document.getElementById('playerDisplay').innerHTML = gameplay.currentPlayer;
      document.getElementById('playerLife').innerHTML = gameplay.getCurrentLife();
  }
}

const countDownScreen = {
  preRender : function(){
    return
      `    <h1 id="count" class="black count-header text-white count-anim">3</h1>`
  },
  postRender : function(){
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
  }
}
