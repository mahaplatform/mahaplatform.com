import Performance from './performance'
import { Page } from 'maha-admin'
import Details from './details'
import Emails from './emails'
import React from 'react'

const getTabs = ({ emails, report, workflow }) => {

  const items = [
    { label: 'Details', component: <Details workflow={ workflow } /> },
    { label: 'Emails', component: <Emails workflow={ workflow } emails={ emails } /> },
    { label: 'Performance', component: <Performance workflow={ workflow } report={ report } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => []

const mapResourcesToPage = (props, context) => ({
  emails: `/api/admin/crm/workflows/${props.params.id}/emails`,
  report: `/api/admin/crm/workflows/${props.params.id}/enrollments/report`,
  workflow: `/api/admin/crm/workflows/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Workflow',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
