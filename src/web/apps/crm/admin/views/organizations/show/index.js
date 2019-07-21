import { Logo, Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { organization }) => ({
  header: <Logo team={{ title: organization.name, logo: organization.logo }} width="120" />,
  items: [
    { label: 'Details', component: <Details organization={ organization } /> }
  ]
})

const getTasks = (user, { organization }) => ({
  items: [
    { label: 'Edit Organization', modal: <Edit organization={ organization } /> }
  ]
})


const mapResourcesToPage = (props, context) => ({
  organization: `/api/admin/crm/organizations/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Organization',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
