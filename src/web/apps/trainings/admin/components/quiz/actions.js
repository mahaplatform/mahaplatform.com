export const fetch = (quiz_id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/trainings/quizes/${quiz_id}/administrations`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const question = (quiz_id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/trainings/quizes/${quiz_id}/administrations/question`,
  request: 'QUESTION_REQUEST',
  success: 'QUESTION_SUCCESS',
  failure: 'QUESTION_FAILURE'
})

export const answer = (quiz_id, answer_id) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/admin/trainings/quizes/${quiz_id}/administrations/answer`,
  body: { answer_id },
  request: 'ANSWER_REQUEST',
  success: 'ANSWER_SUCCESS',
  failure: 'ANSWER_FAILURE'
})

export const next = () => ({
  type: 'NEXT'
})
