import { Observable } from 'rxjs'
import { withLatestFrom, map } from 'rxjs/operators'

import { ofType } from 'redux-observable'

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
    ofType(SQUARE_CLICKED),
    withLatestFrom(state$),
    map(([, state]) => {
      const moves = getMoves(state)
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
    ofType(GAME_OVER)
  )
}
