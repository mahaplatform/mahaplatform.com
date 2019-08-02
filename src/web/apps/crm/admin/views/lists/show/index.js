import { Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ list }) => {

  const items = [
    { label: 'Details', component: <Details list={ list } /> }
  ]

  return { items }

}

const getTasks = ({ list }) => [
  { label: 'Edit List', modal: <Edit list={ list } /> }
]

const mapResourcesToPage = (props, context) => ({
  list: `/api/admin/crm/lists/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
