import { createSelector } from 'reselect'

const trainings = (state, props) => state.trainings || []

const optionsData = (state, props) => state.options || []

export const options = createSelector(
  trainings,
  optionsData,
  (trainings, options) => options.map(option => ({
    trainings: option.training_ids.map(training_id => {
      return trainings.find(training => training.id === training_id)
    })
  }))
)
