const ticTac = document.querySelector(".tic-tac");
const boxes = document.querySelectorAll(".box");
const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
const letsPlayBtn = document.getElementById("lets-play");
const warning = document.getElementById("warning");
const playerDetails = document.getElementById("player-details");
const ticTacGame = document.getElementById("tic-tac-game");

//Declaring variables to keep track of the winner and allowing the user to restart
const restartGame = document.getElementById("restart");
const choosingWinner =document.getElementById("winner");
const restartBtn = document.getElementById("restart-btn");

function player (name, fighter){
    return {name, fighter};
} //Factory Function

const player1 = player("", "X");
const player2 = player("", "O");

const gameBoard = (()=>{
    let winPositions = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
    ];

let currentPlayer = player1;
let playerCheck = player2;
let winner = false; //Helps avoid the draw bug

const assignVal = (item)=>{
    const innerVal = item.querySelector("p");
    
    if (innerVal.textContent===""){
        innerVal.textContent = currentPlayer.fighter;
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        playerCheck = (playerCheck === player1) ? player2 : player1;
    }
    checkWinner(item)
}

const checkWinner = () => {
    const boardState = Array.from(boxes).map((box) => box.querySelector("p").textContent);
  
    for (const [index1, index2, index3] of winPositions) {
      const cell1 = boardState[index1];
      const cell2 = boardState[index2];
      const cell3 = boardState[index3];
  
      if (cell1 !== "" && cell1 === cell2 && cell2 === cell3) {
        // console.log("Winner!");
        restartGame.classList.remove("display");
        ticTacGame.classList.add("display");
        choosingWinner.textContent = `${playerCheck.name} is the winner! 🥳`;
        winner = true;
      }
    }

    if (!boardState.includes("") && winner===false) {
        console.log("Draw!");
    }
  };
  
    return {assignVal}

})(); //IIFE Function

boxes.forEach((item)=>{
    item.addEventListener("click", ()=>{
        gameBoard.assignVal(item);
    });
});

//Adding redirection function to page when the player names have been authenticated
letsPlayBtn.addEventListener("click",()=>{
    if (player1Name.value !="" && player2Name.value!=""){
        warning.classList.add("display");
        playerDetails.classList.add("display");
        
        const playerName1 = player1Name.value;
        const playerName2 = player2Name.value;

        player1.name = playerName1; //Assigning the name to the appropriate object
        player2.name = playerName2;
        
        ticTacGame.classList.remove("display");
    }
    else{
        warning.classList.remove("display");
    }

    player1Name.value ="";
    player2Name.value ="";
})

restartBtn.addEventListener("click", ()=>{
    playerDetails.classList.remove("display");
    boxes.forEach(item =>{
        item.querySelector("p").textContent="";
    });
});