import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = (user, { call }) => ({
  items: [
    { label: 'Details', component: <Details call={ call } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  call: `/api/admin/crm/contacts/${props.params.contact_id}/calls/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Call',
  tabs: getTabs(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
