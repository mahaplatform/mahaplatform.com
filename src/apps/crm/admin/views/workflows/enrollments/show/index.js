import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ actions, enrollment, workflow }) => ({
  items: [
    { label: 'Details', component: <Details actions={ actions } workflow={ workflow } enrollment={ enrollment } /> }
  ]
})

const getTasks = ({ list }) => ({})

const mapResourcesToPage = (props, context) => ({
  actions: `/api/admin/crm/workflows/${props.params.workflow_id}/enrollments/${props.params.id}/actions`,
  workflow: `/api/admin/crm/workflows/${props.params.workflow_id}`,
  enrollment: `/api/admin/crm/workflows/${props.params.workflow_id}/enrollments/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollment',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
