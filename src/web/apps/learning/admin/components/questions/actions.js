export const add = (question) => ({
  type: 'ADD',
  question
})

export const move = (from, to) => ({
  type: 'MOVE',
  from,
  to
})

export const set = (questions) => ({
  type: 'SET',
  questions
})
