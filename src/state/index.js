import { gameOver, squareClicked, nullAction } from './actions'
import { GAME_OVER, SQUARE_CLICKED, NULL } from './constants'
import { initialState, rootReducer } from './reducers'
import { getMoves, getWinningPlayer, getWinningSquares } from './selectors'
import configureStore from './store'

export {
  configureStore,
  GAME_OVER,
  gameOver,
  getMoves,
  getWinningPlayer,
  getWinningSquares,
  initialState,
  NULL,
  nullAction,
  rootReducer,
  SQUARE_CLICKED,
  squareClicked
}
