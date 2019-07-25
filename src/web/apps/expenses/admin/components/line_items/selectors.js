import { createSelector } from 'reselect'
import _ from 'lodash'

const expense_types = (state, props) => state.expense_types

const projects = (state, props) => state.projects

const items = (state, props) => state.line_items

export const line_items = createSelector(
  items,
  expense_types,
  projects,
  (line_items, expense_types, projects) => line_items.map((line_item) => ({
    id: line_item.id,
    expense_type: _.find(expense_types, { id: line_item.expense_type_id }),
    project: _.find(projects, { id: line_item.project_id }),
    description: line_item.description,
    amount: line_item.amount
  }))
)

export const total = createSelector(
  items,
  (line_items) => line_items.reduce((total, line_item) => {
    return total + Number(line_item.amount)
  }, 0.00)
)
