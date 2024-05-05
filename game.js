const ROWS = 6
const COLS = 7
let currentPlayer = 'red'
let board = []
// The game board
const boardContainer = document.querySelector('.board')
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const cell = document.createElement('div')
    cell.className = 'cell'
    cell.dataset.row = row
    cell.dataset.col = col
    boardContainer.appendChild(cell)
  }
}
// board array
for (let row = 0; row < ROWS; row++) {
  board[row] = []
  for (let col = 0; col < COLS; col++) {
    board[row][col] = ''
  }
}
// click function
boardContainer.addEventListener('click', function (event) {
  const cell = event.target
  const row = parseInt(cell.dataset.row)
  const col = parseInt(cell.dataset.col)
  if (isValidMove(row, col)) {
    board[row][col] = currentPlayer
    cell.classList.add(currentPlayer)
    if (checkWin(row, col)) {
      alert(currentPlayer + ' wins!')
      resetBoard()
    } else if (checkDraw()) {
      alert("It's a draw!")
      resetBoard()
    } else {
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red'
    }
  }
})
// Check if there is a valid move
function isValidMove(row, col) {
  return board[row][col] === ''
}
//Win condition checking all 4 directions
function checkWin(row, col) {
  const directions = [
    { x: 0, y: 1 }, // Horizontal
    { x: 1, y: 0 }, // Vertical
    { x: 1, y: 1 }, // Top right to bottom left (Diagonal)
    { x: 1, y: -1 } // Top left to bottom right (Diagonal)
  ]
  for (const direction of directions) {
    let count = 1
    //check direction
    for (let i = 1; i <= 3; i++) {
      const newRow = row + i * direction.y
      const newCol = col + i * direction.x
      if (
        newRow >= 0 &&
        newRow < ROWS &&
        newCol >= 0 &&
        newCol < COLS &&
        board[newRow][newCol] === currentPlayer
      ) {
        count++
      } else {
        break
      }
      if (count === 4) {
        return true
      }
    }
  }
  //Check consecutive cells horizontally
  let horizontalCount = 1
  let leftCol = col - 1
  let rightCol = col + 1
  while (leftCol >= 0 && board[row][leftCol] === currentPlayer) {
    horizontalCount++
    leftCol--
  }
  while (rightCol < COLS && board[row][rightCol] === currentPlayer) {
    horizontalCount++
    rightCol++
  }
  if (horizontalCount >= 4) {
    return true
  }
  return false
}
// Draw condition
function checkDraw() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === '') {
        return false
      }
    }
  }
  return true
}
// Reset
// need to add an option :D
function resetBoard() {
  board = board.map((row) => row.map(() => ''))
  const cells = document.querySelectorAll('.cell')
  for (const cell of cells) {
    cell.className = 'cell'
  }
  currentPlayer = 'red'
}
