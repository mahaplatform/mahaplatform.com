export const createAgreement = (asset_id, profile_id, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/agreements',
  meta: {
    email
  },
  body: {
    email,
    asset_id,
    profile_id
  },
  request: 'CREATE_AGREEMENT_REQUEST',
  success: 'CREATE_AGREEMENT_SUCCESS',
  failure: 'CREATE_AGREEMENT_FAILURE'
})

export const clear = () => ({
  type: 'CLEAR'
})

export const signed = () => ({
  type: 'SIGNED'
})

export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  email
})
