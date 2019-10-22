import { Page } from 'maha-admin'
import Details from './details'
import Access from './access'
import React from 'react'

const getTabs = (user, { program }) => ({
  items: [
    { label: 'Details', component: <Details program={ program } /> },
    { label: 'Access', component: <Access program={ program } /> }
  ]
})

const getTasks = (user, { program}) => ({
  items: []
})

const mapResourcesToPage = (props, context) => ({
  program: `/api/admin/crm/programs/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Program',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
