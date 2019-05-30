export const progress = (progress) => ({
  type: 'PROGRESS',
  progress
})

export const addUpload = (file) => ({
  type: 'ADD_UPLOAD',
  file
})

export const updateUploadProgress = (uniqueIdentifier, progress) => ({
  type: 'UPDATE_UPLOAD_PROGRESS',
  uniqueIdentifier,
  progress
})

export const updateUpload = (uniqueIdentifier, meta) => ({
  type: 'UPDATE_UPLOAD',
  uniqueIdentifier,
  meta
})

export const removeUpload = (file) => ({
  type: 'REMOVE_UPLOAD',
  file
})
