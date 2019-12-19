export const setBusy = (key) => ({
  type: 'SET_BUSY',
  key
})

export const setReady = (key) => ({
  type: 'SET_READY',
  key
})

export const setValid = (key, value, errors) => ({
  type: 'SET_VALID',
  key,
  value,
  errors
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})

export const validate = (reset) => ({
  type: 'VALIDATE',
  reset
})
