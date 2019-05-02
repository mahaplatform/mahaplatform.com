export const setVersion = (version) => ({
  type: 'SET_VERSION',
  version
})

export const setUpdate = (version) => ({
  type: 'SET_UPDATE',
  version
})

export const setProgress = (progress) => ({
  type: 'SET_PROGRESS',
  progress
})

export const setUpdateReady = () => ({
  type: 'SET_UPDATE_READY'
})
