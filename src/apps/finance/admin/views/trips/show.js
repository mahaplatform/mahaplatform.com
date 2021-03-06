import itemButtons from '../item_buttons'
import itemTasks from '../item_tasks'
import { Page } from '@admin'
import Details from './details'
import React from 'react'
import Edit from './edit'

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  trip: `/api/admin/finance/trips/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Mileage',
  rights: ['finance:manage_expenses'],
  panel: {
    component: <Details trip={ resources.trip } />
  },
  tasks: itemTasks('trip', resources.trip, props.user, props.rights, context, Edit),
  buttons: itemButtons(resources.app.settings, 'trip', resources.trip, props.team, props.user, props.rights, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
