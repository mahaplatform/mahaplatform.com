import _ from 'lodash'
import { createSelector } from 'reselect'

const resultsSelector = state => state.results

const chosenSelector = state => state.chosen

export const choice = createSelector(
  resultsSelector,
  chosenSelector,
  (results, chosen) => (chosen !== null && !_.isEmpty(results)) ? results[chosen.model][chosen.index] : null
)
