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

export const clearDo = () => ({
  type: 'CLEAR_DO'
})

export const indexReset = () => ({
  type: 'INDEX_RESET'
})

export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/imports/${id}/items`,
  query: {
    $filter: {
      is_valid: {
        $eq: 'false'
      },
      is_omitted: {
        $eq: 'false'
      }
    }
  },
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const omitRecord = (importId, recordId) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/imports/${importId}/items/${recordId}/omit`,
  request: 'FIX_OMIT_REQUEST',
  success: 'FIX_OMIT_SUCCESS',
  failure: 'FIX_OMIT_FAILURE'
})
