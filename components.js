function render(dom, screen){
    document.getElementById(dom).innerHTML = screen.preRender;
    screen.postRender();
}

class Screen {
  constructor(preRender, postRender){
    this.preRender = preRender;
    this.postRender = postRender;
  }
}

const starterScreen = new Screen (
  `<!-- Start of hero -->

  <div class="starter-hero">
    <img class="brand-logo entry" src="assets/communication.svg" alt="Accent Survival Logo: An arrow piercing two speech bubbles.">
    <div class="starter-hero-header black text-white entry">
      <h1>Accent Survival</h1>
    </div>
    <p class="text-white sub-text entry">The accent guessing survival game.</p>
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

    <a href="#readyScreen" class="button button-large button-green">Start</a>
  </form>

  <!-- end of form -->`,

  function(){
    // function for submitting of start form
    document.getElementById("starter-form").addEventListener('click', function(e){
      //Start of submit processing block
      if(e.target.classList.contains("button-green")){
        //Check if submit button
        let playerData = [];

        //Grab data and add to playerData array
        for (let i = 0; i < e.target.parentNode.elements.length; i++) {
          playerData.push(parseInt(e.target.parentNode.elements[i].value));
        }
        //Pushing data into our state manager.
        //This will also create our players and their data.
        //Refer to gameplay, which acts as the model
        gameplay.createPlayers(playerData);
        if(gameplay.currentPlayer !== ""){
          document.querySelector(".user-button").classList.toggle("none");
        }
      } //Processing block for submit end.
    })
  }
);

const readyScreen = new Screen(
  `<div class="intermediary-header">
    <h1 id="playerDisplay" class="starter-hero-header text-white black" style="padding-bottom: 20px; letter-spacing: 0.035em;">
    </h1>
    <p class="semi-bold text-white underline">Lives: <span id="playerLife"></span></p>
  </div>
  <a href="#countDownScreen" class="button button-large button-orange text-white">Let's go</a>`,

  function(){
    //Pull data from Object to be displayed in DOM
      document.getElementById('playerDisplay').innerHTML = gameplay.currentPlayer;
      document.getElementById('playerLife').innerHTML = gameplay.getCurrentLife();
  }
)

const victorScreen = new Screen(
  `<div class="intermediary-header">
    <h1 id="accent" class="black starter-hero-header" style="color: #F0C020">VICTOR</h1>
    <h1 id="playerDisplay" class="starter-hero-header text-white black" style="padding-bottom: 20px; letter-spacing: 0.035em;">
    </h1>
  </div>`,
  function(){
    document.getElementById('playerDisplay').innerHTML = gameplay.currentPlayer;
  }
)

const countDownScreen = new Screen(
  `<h1 id="count" class="black count-header text-white count-anim">3</h1>`,

  function(){
    let countDown;
    let currentNumber = 3;

    //CountDown Controls
    function stopIterate(){
      clearInterval(countDown);
    }

    //Countdown takes form of promise which resolves upon reaching 0.
    let counter = new Promise((resolve, reject) =>{
      function iterateCount(){
        if(currentNumber === 0){
          stopIterate();
          resolve("Countdown has finished.")
          return document.getElementById('App').innerHTML =`<div class="loader"></div>`;
        }
        document.getElementById('App').innerHTML =
        `<h1 id="count" class="black count-header text-white count-anim">${currentNumber}</h1>`;
        currentNumber--;
      }

      document.getElementById('App').innerHTML = `<h1 id="count" class="black count-header text-white count-anim">${currentNumber}</h1>`;
      countDown = setInterval(iterateCount, 1200);
      currentNumber--;
    }
    )

    //Quote returns a fetch request, which returns a promise.
    let quoteCall = gameplay.getQuote();

    //Require the completion of both async events to progress.
    //The countdown && the request to ensure quote is there and countdown serves it's purpose.
    Promise.all([counter, quoteCall])
    .then((responses)=>{
      //Response 1 is coming from the quote call.
      const [countDownStatus, quoteCallStatus] = responses;
      quoteCallStatus.json()
      .then((data) => {
        gameplay.quote = '"' + (data['contents']['quotes'][0]['quote']) + '"';
      })
      .then(() => {
        window.location.hash = "quoteScreen";
      })
    })
    .catch(err => {
      console.log(err);
    })

  }
);


const quoteScreen = new Screen(
  `<h2 id="playerID" class="semi-bold text-white" style="letter-spacing: 0.035em;"></h2>
  <!-- Quote Card container -->
  <div class="quote-card-container">
    <div class="quote-card">
      <h1 id="quote">
        <div class="loader"></div>
      </h1>
    </div>
    <span style="margin-top: 5px; font-size:0.9em; opacity: 0.7; transform: scale(0.8)"><img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">theysaidso.com</a></span>

    <div class="accent-container text-white" style="margin-top: 20px;">
      <h2 style="text-decoration:underline" class="semi-bold">Accent</h2>
      <h1 id="accent" class="black starter-hero-header">Picking...</h1>
    </div>
  </div>
  <!-- Accent container -->


  <div class="">
    <div class="text-white">TIME(s): <span id="timer">30</span></div>
    <button class="button button-red button-large text-white" id="guessButton">GUESSED!</button>
  </div>`,

  function(){

    //Function to distinguish outcome between guessed and not guessed.

    async function playerPass(){
        await clearInterval(countDown);
        time = 0;
        document.getElementById("timer").innerHTML = await time;
        gameplay.lifeCalc();
        if (gameplay.guessed) {
          gameplay.guessed = !gameplay.guessed;
        }
        gameplay.playerOut();
        //Check if Victor!
        if (Object.keys(gameplay.players).length === 1) {
          gameplay.currentPlayer = Object.keys(gameplay.players)[0];
          return window.location.hash = "victorScreen";
          } else {
          gameplay.playerSwitch();
          return window.location.hash = "readyScreen";
        }
    }
      //Pasting Values into DOM
    document.getElementById("playerID").innerHTML = gameplay.currentPlayer;
      //Controlling style for quote card regarding character length.
    if (gameplay.quote.length >= 85) {
      document.getElementById("quote").style.fontSize = "20px";
    } else if (gameplay.quote.length >= 250){
      document.getElementById("quote").style.fontSize = "25px";
    }
      // Setting data into DOM
    document.getElementById("quote").innerHTML = gameplay.quote;
    document.getElementById("accent").innerHTML = gameplay.getAccent();
      // Adding Functionality to Guessed button
    document.getElementById("guessButton").addEventListener('click', function(){
      gameplay.guessed = !gameplay.guessed;
      playerPass();
    });


      //Timer module
    let time = 31;

    function timer(){
      if (time === 0) {
        playerPass();
      }
      time--;
      document.getElementById("timer").innerHTML = time;
    }

    timer();
    let countDown = setInterval(timer, 1000);
  }
);

const hamburgerScreen = new Screen(
  `<h1 class="black starter-hero-header margin-below text-white zoom">Rules</h1>
  <h1 class="black starter-hero-header margin-below text-white zoom">Quit</h1>`
  ,
  function(){
    document.getElementById("Overlay").addEventListener("click", function(e){
      let overlayer = document.getElementById("Overlay");
      if (e.target.tagName === "H1") {
        //Check for the rules tag.
        if (e.target.innerHTML === "Rules") {
          let rulesModal =
          `<div class="rules">
            <h1 class="rules-exit">&#10006;</h1>
            <div class="rules-box">
              <h2 style="text-decoration: underline; padding-bottom: 20px;">Game Rules.</h2>
              <ul style="margin-left: 20px;">
                <li>This game is played as a 2 or more, players game.</li>
                <li>Players choose the amount of lives each person has at the start of the game.</li>
                <li>Players have 30 seconds to read out a given quote in a given accent.</li>
                <li>The other players must then attempt to guess what accent the current player is speaking in.</li>
                <li>If the other players are not able to guess correctly, the current player loses a life.</li>
                <li>The accent master survives!</li>
              </ul>
            </div>
          </div>`;

          gameplay.rulesVisible = !gameplay.rulesVisible;
          overlayer.insertAdjacentHTML('beforeend', rulesModal);
        }
      }

      //When menu is open.
      if (gameplay.rulesVisible) {
        if (e.target.classList.contains("overlay") || e.target.classList.contains("rules-exit")) {
          overlayer.removeChild(overlayer.childNodes[overlayer.childNodes.length - 1]);
          gameplay.rulesVisible = !gameplay.rulesVisible;
        }
      }

    })
  }
)

const lifeScreen = new Screen(
  `<!-- //Current leading player is displayed here. -->
  <div class="leader">
    <div class="leader-player">
      <h3 class="semi-bold text-white">Leader:</h3>
      <h1 id="leader" class="black text-white starter-hero-header"></h1>
    </div>
    <div class="badge" style="transform: scale(1.4)">
      <img class="badge-heart" src="assets/heart.svg" alt="">
      <div class="text-white black badge-life" id="leaderLife"></div>
    </div>
</div>

<!-- //List of players and associated lives -->
<div class="player-list" id="playerList">
  <h3 class="underline black player-padding">Players</h3>
  <!-- //Player list is inserted dynamically here. -->
  <div class="player-box" id="playerBox">
    <!-- //Individual row -->

  </div>
</div>`
  ,
  function(){
    // Player Display
    //   Getting the the top player.
      let players = Object.keys(gameplay.players);
      let lifeList = [];

      players.forEach((p)=>{
        lifeList.push(gameplay.players[p]["Lives"]);
      })

      function getHighest(arr){
        let currentHighest = 0;
        let highestIdx = 0;
        for(let i = 0; i < arr.length; i++){
          if (arr[i] > currentHighest){
            currentHighest = arr[i];
            highestIdx = i;
          }
          if(i === (arr.length - 1)){
            return {
              player: players[highestIdx],
              life: currentHighest
            };
          }
        }
      }

      let leadingPlayer = getHighest(lifeList);

      function getLeader(p){
        document.getElementById('leader').innerHTML = p.player;
        document.getElementById('leaderLife').innerHTML = p.life;
      }

      getLeader(leadingPlayer);
      //Creating rows from data.
      players.forEach((p)=>{
        let playerName = p;
        let playerLives = gameplay.players[p]["Lives"];

        let playerRowTemplate =
        `<h4 class="semi-bold player-padding">${playerName}</h4>
        <div class="badge">
          <img class="badge-heart" src="assets/heart.svg" alt="">
          <div class="text-white black badge-life">${playerLives}</div>
        </div>`;

        let playerRow = document.createElement("div");
        playerRow.classList.add("player-row");
        playerRow.innerHTML = playerRowTemplate;

        return document.getElementById("playerBox").appendChild(playerRow);

      })
  }
)
