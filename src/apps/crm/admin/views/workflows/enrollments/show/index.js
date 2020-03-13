import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ enrollment, workflow }) => ({
  items: [
    { label: 'Details', component: <Details workflow={ workflow } enrollment={ enrollment } /> }
  ]
})

const getTasks = ({ list }) => ({})

const mapResourcesToPage = (props, context) => ({
  workflow: `/api/admin/crm/workflows/${props.params.workflow_id}`,
  enrollment: `/api/admin/crm/workflows/${props.params.workflow_id}/enrollments/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Enrollment',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
