export const fetch = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/imports',
  query: {
    $filter: {
      object_type: {
        $eq: 'crm_contacts'
      },
      stage: {
        $neq: 'complete'
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const destroy = (id) => ({
  type: 'API_REQUEST',
  method: 'DELETE',
  endpoint: `/api/admin/imports/${id}`,
  meta: { id },
  request: 'DESTROY_REQUEST',
  success: 'DESTROY_SUCCESS',
  failure: 'DESTROY_FAILURE'
})
