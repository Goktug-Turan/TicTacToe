const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""]

const winningMessage = function() {
    return `Player ${currentPlayer} has won!`
};

const drawMessage = function() {
    return `Game ended in a draw!`
};

const currentPlayerTurn = function() {
    return `It's ${currentPlayer}'s turn`
};

statusDisplay.innerHTML = currentPlayerTurn()

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (currentPlayer === "X") {
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "orangered";
    }
};

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    if (currentPlayer === "O") {
        handleComputerTurn()
    }
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange()
};

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
};

//We add our event listeners to the actual game cells and restart button.

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// DENEME playing against comp
// handlePlayerCahnge() {  if (currentPlayer === "O") { handleComputerTurn() }


function handleComputerTurn() {
    var compMoveIndex = Math.floor(Math.random() * 9)
    if (gameState[compMoveIndex] !== "" || !gameActive) {
        handleComputerTurn();
    } else {
        handleCellPlayedByComp(compMoveIndex)
    }
}


function handleCellPlayedByComp(compMoveIndex) {
    gameState[compMoveIndex] = currentPlayer;
    setTimeout(function() {
        document.querySelectorAll('.cell')[compMoveIndex].innerHTML = currentPlayer;
    }, 1000);
    document.querySelectorAll('.cell')[compMoveIndex].style.color = "aqua";
    setTimeout(function() {
        handleResultValidation();
    }, 1000)
};



console.log('It works')

// KOD çok hızlı çalışıyor, bilgisyar senle eşş zamanlı oynuyor