const rows = 6
const columns = 7
let currentPlayer = 1
let boardArray = []
let player1Score = 0
let player2Score = 0

const board = document.getElementById('board')
const message = document.getElementById('message')

// A function that creates the whole board
function createBoard() {
  //Empties out the board
  board.innerHTML = ''

  //resets the board arrays from existance
  boardArray = Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(0))

  // Create the tokens
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement('div')
      cell.className = 'cell'
      cell.addEventListener('click', () => handleClick(i, j))
      board.appendChild(cell)
    }
  }
}

// Check if the board has any empty spaces
function isBoardFull() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (boardArray[i][j] === 0) {
        return false
      }
    }
  }
  return true
}

// Check who won the match
function checkWinner() {
  // Check horizontally for avalability
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= columns - 4; j++) {
      const player = boardArray[i][j]
      if (player === 0) {
        continue
      }
      if (
        player === boardArray[i][j + 1] &&
        player === boardArray[i][j + 2] &&
        player === boardArray[i][j + 3]
      ) {
        return true
      }
    }
  }

  // Check vertically for avalability
  for (let i = 0; i <= rows - 4; i++) {
    for (let j = 0; j < columns; j++) {
      const player = boardArray[i][j]
      if (player === 0) {
        continue
      }
      if (
        player === boardArray[i + 1][j] &&
        player === boardArray[i + 2][j] &&
        player === boardArray[i + 3][j]
      ) {
        return true
      }
    }
  }

  // Check diagonally for avalability (top left to bottom right)
  for (let i = 0; i <= rows - 4; i++) {
    for (let j = 0; j <= columns - 4; j++) {
      const player = boardArray[i][j]
      if (player === 0) {
        continue
      }
      if (
        player === boardArray[i + 1][j + 1] &&
        player === boardArray[i + 2][j + 2] &&
        player === boardArray[i + 3][j + 3]
      ) {
        return true
      }
    }
  }

  // Check diagonally for avalability (top right to bottom left)
  for (let i = 0; i <= rows - 4; i++) {
    for (let j = 3; j < columns; j++) {
      const player = boardArray[i][j]
      if (player === 0) {
        continue
      }
      if (
        player === boardArray[i + 1][j - 1] &&
        player === boardArray[i + 2][j - 2] &&
        player === boardArray[i + 3][j - 3]
      ) {
        return true
      }
    }
  }

  return false
}

// Reset function
function resetGame() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      boardArray[i][j] = 0
    }
  }

  // Remove player classes from cells////////////////
  const cells = board.getElementsByClassName('cell')
  Array.from(cells).forEach((cell) => {
    cell.classList.remove('player1', 'player2')
  })

  // Resets current player score
  currentPlayer = 1
  message.textContent = `Player ${currentPlayer}'s turn`

  // Reset score yet to be fixed since it counts how many tiles a player dropped :(
  player1Score = 0
  player2Score = 0
  updateScoreboard()
}

// It's in the function name :D
function updateScoreboard() {
  const player1ScoreElement = document.getElementById('player1-score')
  const player2ScoreElement = document.getElementById('player2-score')
  player1ScoreElement.textContent = `Player 1: ${player1Score}`
  player2ScoreElement.textContent = `Player 2: ${player2Score}`
}

// A veru
function handleClick(row, col) {
  // Checks for avalability in columns
  if (boardArray[0][col] !== 0) {
    return
  }

  // This abomination of a function that made me almost lose my mind for a whole day, but NEVER BACK DOWN NEVER WHAT ? NEVER GIVE UP !!!!!!!
  for (let i = rows - 1; i >= 0; i--) {
    if (boardArray[i][col] === 0) {
      boardArray[i][col] = currentPlayer
      const cell = board.children[i * columns + col]
      cell.classList.add(`player${currentPlayer}`)
      break
    }
  }

  // Checks for win conditions on players
  if (checkWinner()) {
    message.textContent = `Player ${currentPlayer} wins!`
    if (currentPlayer === 1) {
      player1Score++
    } else {
      player2Score++
    }
    updateScoreboard()
    return
  }

  // Check for draw
  if (isBoardFull()) {
    message.textContent = "It's a tie!"
    return
  }

  // Switch turns after a player turn
  currentPlayer = currentPlayer === 1 ? 2 : 1
  message.textContent = `Player ${currentPlayer}'s turn`
}

// Event listener for the reset button to be clickable :D
const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', resetGame)

// Starting the game
createBoard()
message.textContent = `Player ${currentPlayer}'s turn`
updateScoreboard()
