import Materials from './materials'
import Complete from '../complete'
import { Page } from 'maha-admin'
import Lessons from './lessons'
import Details from './details'
import Quizes from './quizes'
import React from 'react'

const getTabs = (user, { assignment, lessons, materials, quizes }) => {

  const items = [
    { label: 'Details', component: <Details user={ user } assignment={ assignment } /> }
  ]

  if(assignment.training.type === 'local') {
    items.push({ label: 'Materials', component: <Materials materials={ materials } /> })
    items.push({ label: 'Quizes', component: <Quizes quizes={ quizes } /> })
  }

  if(assignment.training.type === 'maha') {
    items.push({ label: 'Lessons', component: <Lessons lessons={ lessons } /> })
  }

  return { items }

}

const getButtons = (user, { assignment }) => {

  if(user.id === assignment.employee.id && !assignment.completed_at) {
    return [
      { label: 'Complete Training', color: 'green', modal: <Complete assignment={ assignment } /> }
    ]
  }

  return null

}

const mapResourcesToPage = (props, context) => ({
  assignment: `/api/admin/trainings/assignments/${props.params.id}`,
  materials: `/api/admin/trainings/assignments/${props.params.id}/materials`,
  lessons: `/api/admin/trainings/assignments/${props.params.id}/lessons`,
  quizes: `/api/admin/trainings/assignments/${props.params.id}/quizes`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(props.user, resources),
  buttons: getButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
