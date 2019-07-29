import { createSelector } from 'reselect'
import _ from 'lodash'

const expense_types = (state, props) => state.expense_types

const projects = (state, props) => state.projects

const line_items = (state, props) => state.line_items

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
    tax: Number(line_item.tax),
    total: Number(line_item.amount) + Number(line_item.tax)
  }))
)

export const status = createSelector(
  expense_types,
  projects,
  (expense_types, projects) => {
    return expense_types.status === 'success' && projects.status === 'success' ? 'ready' : 'loading'
  }
)

export const total = createSelector(
  display,
  (line_items) => line_items.reduce((total, line_item) => {
    return total + Number(line_item.total)
  }, 0.00)
)
