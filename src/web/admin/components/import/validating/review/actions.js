export const init = (imp) => ({
  type: 'INIT',
  import: imp
})

export const previous = () => ({
  type: 'PREVIOUS'
})

export const next = () => ({
  type: 'NEXT'
})

export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/${id}/items`,
  query: {
    $filter: {
      is_duplicate: {
        $eq: 'false'
      },
      is_omitted: {
        $eq: 'false'
      },
      is_nonunique: {
        $eq: 'false'
      },
      is_valid: {
        $eq: 'true'
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})
