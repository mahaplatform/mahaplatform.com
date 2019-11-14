export const addFile = (file) => ({
  type: 'ADD_FILE',
  file
})

export const removeFile = (index) => ({
  type: 'REMOVE_FILE',
  index
})

export const updateFile = (uid, data) => ({
  type: 'UPDATE_FILE',
  uid,
  data
})
