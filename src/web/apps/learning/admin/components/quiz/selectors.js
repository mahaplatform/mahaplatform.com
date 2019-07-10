import { createSelector } from 'reselect'

const answers = (state, props) => state.question ? state.question.answers : null

const answering = (state, props) => {
  return state.answering
}

export const correctIndex = createSelector(
  answers,
  answering,
  (answers, answering) => {
    return (answers && answering) ? answers.reduce((correctIndex, answer, index) => {
      if(correctIndex !== null) return correctIndex
      return (answer.id === answering.correct_answer) ? index : null
    }, null) : null
  }
)

export const correct = createSelector(
  correctIndex,
  (correctIndex) => correctIndex !== null ? (correctIndex + 10).toString(36).toUpperCase() : null
)
