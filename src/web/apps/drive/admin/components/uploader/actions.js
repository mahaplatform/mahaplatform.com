export const add = (file) => ({
  type: 'ADD',
  file
})

export const create = (files) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/admin/drive/files/upload',
  body: { files },
  request: 'CREATE_REQUEST',
  success: 'CREATE_SUCCESS',
  failure: 'CREATE_FAILURE'
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const toggle = () => ({
  type: 'TOGGLE'
})

export const update = (index, data) => ({
  type: 'UPDATE',
  index,
  data
})
