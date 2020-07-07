export const request = ({ method, endpoint, query, body, onSuccess, onFailure }) => ({
  type: 'API_REQUEST',
  method,
  endpoint,
  query,
  body,
  request: 'REQUEST_REQUEST',
  success: 'REQUEST_SUCCESS',
  failure: 'REQUEST_FAILURE',
  onSuccess,
  onFailure
})
