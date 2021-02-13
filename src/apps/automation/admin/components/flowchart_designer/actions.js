export const fetch = (entity) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/admin/${entity}/config/versions`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const save = (entity, steps) => ({
  type: 'API_REQUEST',
  method: 'PATCH',
  endpoint: `/api/admin/${entity}/config/versions`,
  body: {
    value: { steps }
  },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const set = (steps) => ({
  type: 'SET',
  steps
})

export const add = (step) => ({
  type: 'ADD',
  step
})

export const edit = (code) => ({
  type: 'EDIT',
  code
})

export const hover = (hovering) => ({
  type: 'HOVER',
  hovering
})

export const newStep = (step) => ({
  type: 'NEW_STEP',
  step
})

export const remove = (step) => ({
  type: 'REMOVE',
  step
})

export const update = (code, config) => ({
  type: 'UPDATE',
  code,
  config
})

export const expand = (code) => ({
  type: 'EXPAND',
  code
})

export const setVersion = (index) => ({
  type: 'SET_VERSION',
  index
})
