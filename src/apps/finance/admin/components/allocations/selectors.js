import { createSelector } from 'reselect'
import _ from 'lodash'

const expense_types = (state, props) => state.expense_types

const projects = (state, props) => state.projects

const allocations = (state, props) => state.allocations

const total = (state, props) => props.total || 0.00

export const display = createSelector(
  allocations,
  expense_types,
  projects,
  (allocations, expense_types, projects) => allocations.map((allocation) => ({
    id: allocation.id,
    expense_type: _.find(expense_types.records, { id: allocation.expense_type_id }),
    project: _.find(projects.records, { id: allocation.project_id }),
    description: allocation.description,
    amount: Number(allocation.amount),
    can_edit: allocation.can_edit,
    can_delete: allocation.can_delete
  }))
)

export const status = createSelector(
  expense_types,
  projects,
  (expense_types, projects) => {
    return expense_types.status === 'success' && projects.status === 'success' ? 'ready' : 'loading'
  }
)

export const sum = createSelector(
  display,
  (allocations) => allocations.reduce((sum, allocation) => {
    return sum + Number(allocation.amount)
  }, 0.00)
)

export const unassigned = createSelector(
  total,
  sum,
  (total, sum) => total > 0 && total > sum ? total - sum : null
)

export const overassigned = createSelector(
  total,
  sum,
  (total, sum) => total > 0 && sum > total ? sum - total : null
)
