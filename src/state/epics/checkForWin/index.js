import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { head, length, union } from 'ramda'
import { isNonEmptyArray } from 'ramda-adjunct'

import {
  getMoves,
  gameOver,
  nullAction,
  SQUARE_CLICKED,
  GAME_OVER
} from '../..'
import { getBoard, getWins } from '../../../utilities'

export default function checkForWinEpic (action$, state$) {
  return action$.pipe(
    filter(action => action.type === SQUARE_CLICKED),
    map(() => {
      const moves = getMoves(state$.value)
      const plays = length(moves)

      if (plays < 5) return nullAction()

      const board = getBoard(moves)
      const wins = getWins(board)

      if (isNonEmptyArray(wins)) {
        const squares = length(wins) < 2 ? head(wins) : union(...wins)
        const player = board[head(squares)]

        return gameOver(squares, player)
      }

      if (plays > 8) {
        return gameOver([])
      }

      return nullAction()
    }),
    filter(action => action.type === GAME_OVER)
  )
}
