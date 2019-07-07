import Materials from './materials'
import Complete from '../complete'
import { Page } from 'maha-admin'
import Lessons from './lessons'
import Details from './details'
import Quizes from './quizes'
import React from 'react'

const getTabs = ({ assignment, lessons, materials }) => {

  const items = [
    { label: 'Details', component: <Details assignment={ assignment } /> }
  ]

  if(assignment.training.type === 'local') {
    items.push({ label: 'Materials', component: <Materials materials={ materials } /> })
    items.push({ label: 'Quizes', component: <Quizes assignment={ assignment } /> })
  }

  if(assignment.training.type === 'maha') {
    items.push({ label: 'Lessons', component: <Lessons lessons={ lessons } /> })
  }

  return { items }

}

const getButtons = ({ assignment }) => {

  const items = [
    { label: 'Complete Training', color: 'green', modal: <Complete assignment={ assignment } /> }
  ]

  return items

}

const mapResourcesToPage = (props, context) => ({
  assignment: `/api/admin/learning/assignments/${props.params.id}`,
  materials: `/api/admin/learning/assignments/${props.params.id}/materials`,
  lessons: `/api/admin/learning/assignments/${props.params.id}/lessons`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(resources),
  buttons: getButtons(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
