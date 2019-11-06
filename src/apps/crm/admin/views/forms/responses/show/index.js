import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = ({ form }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } /> }
  ]
})

const getTasks = ({ form, list }) => {}

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
