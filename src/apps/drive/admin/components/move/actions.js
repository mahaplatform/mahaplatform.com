export const changeFolder = (folder) => ({
  type: 'CHANGE_FOLDER',
  folder
})

export const up = () => ({
  type: 'UP'
})

export const move = (id, folder_id) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/drive/items/${id}/move`,
  body: { folder_id },
  request: 'MOVE_REQUEST',
  success: 'MOVE_SUCCESS',
  failure: 'MOVE_FAILURE'
})
