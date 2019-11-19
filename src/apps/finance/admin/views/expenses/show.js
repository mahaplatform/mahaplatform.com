import itemButtons from '../item_buttons'
import itemTasks from '../item_tasks'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  expense: `/api/admin/finance/expenses/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Expense',
  rights: ['finance:manage_expenses'],
  panel: {
    component: <Details expense={ resources.expense } />
  },
  tasks: itemTasks('expense', resources.expense, props.user, props.rights, context, Edit),
  buttons: itemButtons(resources.app.settings, 'expense', resources.expense, props.team, props.user, props.rights, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
