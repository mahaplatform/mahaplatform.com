import Assignments from './assignments'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'
import Edit from '../edit'

const getTabs = ({ assignments, offering }) => {

  const items = [
    { label: 'Details', component: <Details offering={ offering } /> },
    { label: 'Attendees', component: <Assignments assignments={ assignments } /> }
  ]

  return { items }

}

const getTasks = ({ offering }) => {

  const items = [
    { label: 'Edit Offering', modal: <Edit offering={ offering } /> }
  ]

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  offering: `/api/admin/learning/trainings/${props.params.training_id}/offerings/${props.params.id}`,
  assignments: `/api/admin/learning/trainings/${props.params.training_id}/offerings/${props.params.id}/assignments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Offering',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
