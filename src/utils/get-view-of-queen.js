import xrange from './xrange'

const boardWidth = 8
const boardLimit = (boardWidth * boardWidth) -1
const eightRange = xrange(boardWidth)

const getViewOfQueen = pos => {
  const col = pos % boardWidth
  const line = (pos - col) / boardWidth

  const lineView = eightRange
    .map((_, num) => boardWidth * line + num)

  const colView = eightRange
    .map((_, num) => num * boardWidth + col)
  
  const diagLeftView = colView
    .map((num, key) => (console.log(line, +col, -key), num +line -key))
    .filter(num => num < pos ? num % boardWidth > col : num % boardWidth < col)

  const diagRightView = colView
    .map((num, key) => (console.log(line, +col, -key), num -line +key))
    .filter(num => num < pos ? num % boardWidth < col : num % boardWidth > col)

  console.log({ lineView, colView, diagLeftView, diagRightView })
  return [...lineView, ...colView, ...diagLeftView, ...diagRightView]
    .filter(num => 0 <= num && num <= boardLimit)
}

export default getViewOfQueen
