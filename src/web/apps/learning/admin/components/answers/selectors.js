import { createSelector } from 'reselect'

const unscored = (state, props) => state.answers

const correct_answer = (state, props) => state.correct_answer

export const answers = createSelector(
  unscored,
  correct_answer,
  (answers, correct) => answers.map((answer, index) => ({
    ...answer,
    is_correct: index === correct
  }))
)
