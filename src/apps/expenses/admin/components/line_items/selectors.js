import { createSelector } from 'reselect'
import _ from 'lodash'

const expense_types = (state, props) => state.expense_types

const projects = (state, props) => state.projects

const line_items = (state, props) => state.line_items

const total = (state, props) => props.total || 0.00

export const display = createSelector(
  line_items,
  expense_types,
  projects,
  (line_items, expense_types, projects) => line_items.map((line_item) => ({
    id: line_item.id,
    expense_type: _.find(expense_types.records, { id: line_item.expense_type_id }),
    project: _.find(projects.records, { id: line_item.project_id }),
    description: line_item.description,
    amount: Number(line_item.amount),
    can_edit: line_item.can_edit,
    can_delete: line_item.can_delete
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
  (line_items) => line_items.reduce((sum, line_item) => {
    return sum + Number(line_item.amount)
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
