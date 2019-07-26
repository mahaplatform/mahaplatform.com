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
  endpoint: '/api/admin/expenses/expense_types/active',
  request: 'FETCH_EXPENSE_TYPES_REQUEST',
  success: 'FETCH_EXPENSE_TYPES_SUCCESS',
  failure: 'FETCH_EXPENSE_TYPES_FAILURE'
})

export const add = (line_item) => ({
  type: 'ADD',
  line_item
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const set = (line_items) => ({
  type: 'SET',
  line_items
})

export const update = (line_item, index) => ({
  type: 'UPDATE',
  line_item,
  index
})
