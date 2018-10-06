import { filter, map, withLatestFrom } from 'rxjs/operators'

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
    map(([, state]) => getMoves(state)),
    map(moves => ({
      moves,
      plays: length(moves)
    })),
    filter(({ plays }) => plays >= 5),
    map(({ moves, plays }) => {
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
