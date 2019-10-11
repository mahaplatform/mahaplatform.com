import { createSelector } from 'reselect'

const numbers = (state, props) => state.numbers

const chosen = (state, props) => state.chosen

export const number = createSelector(
  numbers,
  chosen,
  (numbers, chosen) => chosen !== null ? numbers[chosen] : null
)
