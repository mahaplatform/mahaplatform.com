export const fetchProfiles = (url) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/profiles',
  query: {
    $filter: {
      type: {
        $in: ['files','photos']
      }
    }
  },
  request: 'FETCH_PROFILES_REQUEST',
  success: 'FETCH_PROFILES_SUCCESS',
  failure: 'FETCH_PROFILES_FAILURE'
})

export const create = (endpoint, file) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body: { id: file.id },
  meta: { file },
  request: 'CREATE_REQUEST',
  success: 'CREATE_SUCCESS',
  failure: 'CREATE_FAILURE'
})

export const addFile = (file) => ({
  type: 'ADD_FILE',
  file
})

export const addAsset = (file_id, asset) => ({
  type: 'ADD_ASSET',
  file_id,
  asset
})

export const removeFile = (file) => ({
  type: 'REMOVE_FILE',
  file
})

export const removeAsset = (asset) => ({
  type: 'REMOVE_ASSET',
  asset
})
