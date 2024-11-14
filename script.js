const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startButton');
const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start Game
startButton.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusMessage.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
    } else if (board.every(cell => cell !== null)) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
