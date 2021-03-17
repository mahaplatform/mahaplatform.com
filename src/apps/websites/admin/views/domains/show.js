import NewRecord from './records/new'
import Details from './details'
import { Page } from '@admin'
import React from 'react'
import Zone from './zone'

const getTabs = ({ audits, domain, records }) => ({
  items: [
    { label: 'Details', component: <Details audits={ audits } domain={ domain } records={ records } /> },
    ...domain.dns_status === 'success' ? [
      { label: 'DNS', component: <Zone domain={ domain } records={ records } /> }
    ] : []
  ]
})

const getTasks = ({ domain }) => ({
  items: [
    { label: 'Add Record', modal: <NewRecord domain={ domain } /> }
  ]
})

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/websites_domains/${props.params.id}/audits`,
  domain: `/api/admin/websites/domains/${props.params.id}`,
  records: `/api/admin/websites/domains/${props.params.id}/records`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Domain',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
