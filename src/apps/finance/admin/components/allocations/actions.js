export const fetchProjects = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_PROJECTS_REQUEST',
  success: 'FETCH_PROJECTS_SUCCESS',
  failure: 'FETCH_PROJECTS_FAILURE'
})

export const fetchExpenseTypes = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/finance/expense_types',
  request: 'FETCH_EXPENSE_TYPES_REQUEST',
  success: 'FETCH_EXPENSE_TYPES_SUCCESS',
  failure: 'FETCH_EXPENSE_TYPES_FAILURE'
})

export const add = (allocation) => ({
  type: 'ADD',
  allocation
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (allocations) => ({
  type: 'SET',
  allocations
})

export const update = (allocation, index) => ({
  type: 'UPDATE',
  allocation,
  index
})
