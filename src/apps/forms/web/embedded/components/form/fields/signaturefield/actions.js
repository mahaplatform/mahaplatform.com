export const createAgreement = (asset_id, profile_id, name, email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/agreements',
  body: {
    name,
    email,
    asset_id,
    profile_id
  },
  request: 'CREATE_AGREEMENT_REQUEST',
  success: 'CREATE_AGREEMENT_SUCCESS',
  failure: 'CREATE_AGREEMENT_FAILURE'
})

export const signed = () => ({
  type: 'SIGNED'
})
