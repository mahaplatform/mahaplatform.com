export const setProgress = (progress) => ({
  type: 'SET_PROGRESS',
  progress
})

export const setTitle = (title) => ({
  type: 'SET_TITLE',
  title
})

export const setUpdate = (version) => ({
  type: 'SET_UPDATE',
  version
})

export const setUpdateReady = () => ({
  type: 'SET_UPDATE_READY'
})

export const setVersion = (version) => ({
  type: 'SET_VERSION',
  version
})

export const updateUnseen = (unseen) => ({
  type: 'UPDATE_UNSEEN',
  unseen
})
