import Details from './details'
import { Page } from '@admin'
import React from 'react'

const getTabs = ({ audits, website }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } website={ website } /> }
  ]
})

const getTasks = ({ domain }) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/websites_websites/${props.params.id}/audits`,
  website: `/api/admin/websites/websites/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Website',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
