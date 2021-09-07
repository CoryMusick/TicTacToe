// GAMEBOARD WINNING COMBOS
// [012] [345] [678] [036] [147] [258] [642] [048]  
// Game board IFFE, immidiately invoked, gameboard Obj created;
const GameBoard = (() => {
  let spaces = new Array(9);

  const getSpace = (num) => spaces[num]
  
  const setSpace = (num, symbol) =>{  
    spaces[num] = symbol;
  }

  const getSpacesArray = () => spaces;

  return {getSpacesArray, getSpace, setSpace}
})();



//Player Factory Function
const Player = (name, symbol) => {
  let isTurn = false;
 
  const getName = () => name;
  const getTurn = () => isTurn;
  const getSymbol = () => symbol;

  const setTurn = (bool) => isTurn = bool;
  
  return {getSymbol, getName, setTurn, getTurn}
}

// GAME CONTROLLER MODULE
const GameController = (() => {
  let playerArray = [];
  let isRunning = false;
  let winState = false;

  // fill default player array 
  const playerOne = Player("player1", "X")
  const playerTwo = Player("Player2", "O")
  playerArray.push(playerOne);
  playerArray.push(playerTwo);
  

  // starts the game changes isRunning variable
  start = () => {
    console.log("start runs")
    if(!isRunning){
     playerArray[0].setTurn(true);
     isRunning = true; 
     console.log(playerArray[0].getName())
    }
    else{
      console.log('game already in progress')
    }
  }

  end = () => {
    isRunning = false;
  }

  // Toggles Turns
  nextTurn = () => {
    console.log("next turn")
    playerArray.forEach(player => {
      player.setTurn(!player.getTurn())
      console.log(player.getName()+  " = " +  player.getTurn())
    })
  }

  // returns player with isTurn = true;
  getCurrentPlayer = () => {
    let currentPlayer;
    playerArray.forEach(player => {
      if(player.getTurn()){
        currentPlayer = player;
      }
    })
    return currentPlayer
  }

  //returns game run state;
  getIsRunning = () => isRunning;

  //check win
  // [012] [345] [678] [036] [147] [258] [642] [048]
  checkWinStatus = () => {
    let spaces = GameBoard.getSpacesArray();
    console.log(spaces)
   

    // ?? how to refactor
   // X WIN STATES
    if(spaces[0] === "X" && spaces[1] === "X" && spaces[2] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[3] === "X" && spaces[4] === "X" && spaces[5] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[6] === "X" && spaces[7] === "X" && spaces[8] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[0] === "X" && spaces[3] === "X" && spaces[6] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[1] === "X" && spaces[4] === "X" && spaces[7] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[2] === "X" && spaces[5] === "X" && spaces[8] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[6] === "X" && spaces[4] === "X" && spaces[2] === "X"){
      alert("X's Win")
      end();
    }

    if(spaces[0] === "X" && spaces[4] === "X" && spaces[8] === "X"){
      alert("X's Win")
      end();
    }

    // O WIN STATES

    if(spaces[0] === "O" && spaces[1] === "O" && spaces[2] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[3] === "O" && spaces[4] === "O" && spaces[5] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[6] === "O" && spaces[7] === "O" && spaces[8] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[0] === "O" && spaces[3] === "O" && spaces[6] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[1] === "O" && spaces[4] === "O" && spaces[7] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[2] === "O" && spaces[5] === "O" && spaces[8] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[6] === "O" && spaces[4] === "O" && spaces[2] === "O"){
      alert("O's Win")
      end();
    }

    if(spaces[0] === "O" && spaces[4] === "O" && spaces[8] === "O"){
      alert("O's Win")
      end();
    }
  }  
  // Game Controller sets board state and checks win status
  spaceClickLogicHandler = (e) => {
    const spaceIndex = e.target.id.split("-")[1];
    if(!GameBoard.getSpace(spaceIndex)){
      GameBoard.setSpace(spaceIndex, getCurrentPlayer().getSymbol())
      checkWinStatus();
      ViewController.updateView(GameBoard.getSpacesArray());
      nextTurn(); 
    }else{
      alert("Make Another Selection")
    }

  }

  const gameContainer = document.querySelector("#game-container")
  gameContainer.addEventListener("click", e => spaceClickLogicHandler(e))

  return{checkWinStatus, playerArray, start, getIsRunning, getCurrentPlayer, nextTurn}
})();



// VIEW CONTROLLER IFFE instantiates imediately. 
const ViewController = (() => {
  
  // button starts games
  startButtonHandler = (e) => {
    if(e.target.id === "start-button"){
      GameController.start();
    }
  }

  clear = () =>{

  }


  updateView = (array) => {
    console.log("update View runs")
    console.log(array)
    array.forEach((space, index) => {
      let spaceContainer = document.querySelector(`#space-${index}`);
      spaceContainer.innerText = space;
    })
  }

  // add event listeners immediately in IFFE
  const startButton = document.querySelector("#start-button");
  startButton.addEventListener("click", e => startButtonHandler(e))


  return {updateView}
})()

