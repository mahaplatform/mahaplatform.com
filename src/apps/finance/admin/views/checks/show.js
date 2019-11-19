import itemButtons from '../item_buttons'
import itemTasks from '../item_tasks'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  check: `/api/admin/finance/checks/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Check',
  rights: ['finance:manage_expenses'],
  panel: {
    component: <Details check={ resources.check } />
  },
  tasks: itemTasks('check', resources.check,props.user, props.rights, context, Edit),
  buttons: itemButtons(resources.app.settings, 'check', resources.check, props.team, props.user, props.rights, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
