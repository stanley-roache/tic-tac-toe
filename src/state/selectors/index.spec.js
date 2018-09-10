import { getMoves } from '.'

describe('state:selectors', () => {
  describe('getMoves', () => {
    it('extracts the moves from the state', () => {
      const moves = [4, 0, 2]
      const state = { moves }

      expect(getMoves(state)).toBe(moves)
    })
  })
})
