import { createSelector } from 'reselect'

const questions = (state, props) => props.questions

const answers = (state, props) => state.answers

export const is_complete = createSelector(
  questions,
  answers,
  (questions, answers) => questions.length === Object.keys(answers).length
)
