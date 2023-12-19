//Grabbing the elements from HTML
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const cells = document.querySelectorAll(".box");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initGame();

function initGame() {
    cells.forEach((cell) => cell.addEventListener('click', cellClicked));
    reset.addEventListener('click', restartGame);
    start.addEventListener('click', startGame);
    playerTurn.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){
    const cellId = this.getAttribute('id');

    if(options[cellId] != "" || !running){
        return;
    }

    updateCell(this, cellId);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    playerTurn.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        playerTurn.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        playerTurn.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    playerTurn.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = false;
}

function startGame(){
    running = true;
}
