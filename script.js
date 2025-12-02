const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("played");

  if (checkWinner()) {
    statusText.textContent = `🏆 Player ${currentPlayer} Wins!`;
    statusText.style.color = "#00ffc3";
    gameActive = false;
    glowWinningCells();
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "🤝 It's a Tie!";
    statusText.style.color = "#ffeb3b";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    statusText.style.color = "#ffeb3b";
  }
}

function checkWinner() {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function glowWinningCells() {
  winPatterns.forEach(pattern => {
    if (pattern.every(index => board[index] === currentPlayer)) {
      pattern.forEach(index => {
        cells[index].style.background = "rgba(0,255,195,0.2)";
        cells[index].style.boxShadow = "0 0 25px #00ffc3";
      });
    }
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  statusText.style.color = "#ffeb3b";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("played");
    cell.style.background = "rgba(255, 255, 255, 0.08)";
    cell.style.boxShadow = "0 0 10px #00eaff";
  });
}
