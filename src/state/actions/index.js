import { GAME_OVER, SQUARE_CLICKED, NULL } from '..'

function gameOver (squares, player) {
  return {
    type: GAME_OVER,
    payload: {
      winners: {
        squares,
        player
      }
    }
  }
}

function squareClicked (square) {
  return {
    type: SQUARE_CLICKED,
    payload: {
      square
    }
  }
}

function nullAction () {
  return {
    type: NULL
  }
}

export { gameOver, squareClicked, nullAction }
