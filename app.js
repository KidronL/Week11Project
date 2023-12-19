//Grabbing the elements from HTML
const start = $('#start');
const reset = $('#reset');
const cells = document.querySelectorAll(".box");
const winConditions = [
    [cell0, cell1, cell2],
    [cell3, cell4, cell5],
    [cell6, cell7, cell8],
    [cell0, cell3, cell6],
    [cell1, cell4, cell7],
    [cell2, cell5, cell8],
    [cell0, cell4, cell8],
    [cell2, cell4, cell6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initGame();

function initGame() {
    cells.forEach((cell) => cell.addEventListener('click', cellClicked))
    reset.addEventListener('click', restartGame);
    start.addEventListener('click', startGame);
    playerTurn.textContent = `${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){
    const cellId = cells.getAttribute('id');

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
