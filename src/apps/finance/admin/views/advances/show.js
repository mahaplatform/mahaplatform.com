import itemButtons from '../item_buttons'
import itemTasks from '../item_tasks'
import { Page } from '@admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  advance: `/api/admin/finance/advances/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Cash Advance',
  rights: ['finance:manage_expenses'],
  panel: {
    component: <Details advance={ resources.advance } />
  },
  tasks: itemTasks('advance', resources.advance, props.user, props.rights, context, Edit),
  buttons: itemButtons(resources.app.settings, 'advance', resources.advance, props.team, props.user, props.rights, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
