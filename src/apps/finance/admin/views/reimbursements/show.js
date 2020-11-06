import itemButtons from '../item_buttons'
import itemTasks from '../item_tasks'
import { Page } from '@admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  reimbursement: `/api/admin/finance/reimbursements/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Reimbursement',
  rights: ['finance:manage_expenses'],
  panel: {
    component: <Details reimbursement={ resources.reimbursement } />
  },
  tasks: itemTasks('reimbursement', resources.reimbursement, props.user, props.rights, context, Edit),
  buttons: itemButtons(resources.app.settings, 'reimbursement', resources.reimbursement, props.team, props.user, props.rights, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
