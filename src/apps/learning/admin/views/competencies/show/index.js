import AssignResources from '../resources'
import { Page } from 'maha-admin'
import Edit from '../edit'
import React from 'react'
import Details from './details'
import Resources from './resources'

const getTabs = ({ competency, resources }) => {

  const items = [
    { label: 'Details', component: <Details competency={ competency } /> },
    { label: 'Resources', component: <Resources competency={ competency } resources={ resources } /> }
  ]

  return { items }

}


const getTasks = ({ competency, resources }) => {

  const items = [
    { label: 'Edit Competency', modal: <Edit id={ competency.id } /> },
    { label: 'Manage Resources', modal: <AssignResources competency={ competency } resources={ resources } /> }
  ]

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  competency: `/api/admin/learning/learning/${props.params.id}`,
  resources: `/api/admin/learning/learning/${props.params.id}/resources`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Competency',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
