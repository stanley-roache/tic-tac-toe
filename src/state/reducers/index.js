import { isUndefined } from 'ramda-adjunct'

import { GAME_OVER, SQUARE_CLICKED } from '..'

const initialState = { moves: [] }

function rootReducer (state = initialState, { payload = {}, type }) {
  const { square, winners: { squares, player } = {} } = payload

  switch (type) {
    case GAME_OVER:
      return {
        ...state,
        winningSquares: squares,
        winningPlayer: player
      }
    case SQUARE_CLICKED:
      return {
        ...state,
        moves: isUndefined(payload.square)
          ? state.moves
          : [...state.moves, payload.square]
      }
    default:
      return state
  }
}

export { initialState, rootReducer }
