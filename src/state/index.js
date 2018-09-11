import { GAME_OVER, SQUARE_CLICKED } from './constants'
import { squareClicked } from './actions'
import { initialState, rootReducer } from './reducers'
import { getMoves } from './selectors'
import configureStore from './store'

export {
  configureStore,
  GAME_OVER,
  getMoves,
  initialState,
  rootReducer,
  SQUARE_CLICKED,
  squareClicked
}
