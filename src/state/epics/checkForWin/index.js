import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/of'
import { head, length, union } from 'ramda'
import { isNonEmptyArray } from 'ramda-adjunct'

import { getMoves, gameOver, SQUARE_CLICKED } from '../..'
import { getBoard, getWins } from '../../../utilities'

export default function checkForWinEpic (action$, store) {
  return action$.ofType(SQUARE_CLICKED).mergeMap(({ payload }) => {
    const moves = getMoves(store.getState())
    const plays = length(moves)

    if (plays < 5) {
      return Observable.of()
    }

    const board = getBoard(moves)
    const wins = getWins(board)

    if (isNonEmptyArray(wins)) {
      const squares = length(wins) < 2 ? head(wins) : union(...wins)
      const player = board[head(squares)]

      return Observable.of(gameOver(squares, player))
    }

    if (plays > 8) {
      return Observable.of(gameOver([]))
    }
  })
}
