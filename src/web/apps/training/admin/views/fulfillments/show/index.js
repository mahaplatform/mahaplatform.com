import Materials from './materials'
import Complete from '../complete'
import { Page } from 'maha-admin'
import Lessons from './lessons'
import Details from './details'
import Quizes from './quizes'
import React from 'react'

const getTabs = (user, { fulfillment, lessons, materials, quizes }) => {

  const items = [
    { label: 'Details', component: <Details user={ user } fulfillment={ fulfillment } /> }
  ]

  if(fulfillment.training.type === 'local') {
    items.push({ label: 'Materials', component: <Materials materials={ materials } /> })
    items.push({ label: 'Quizes', component: <Quizes quizes={ quizes } /> })
  }

  if(fulfillment.training.type === 'maha') {
    items.push({ label: 'Lessons', component: <Lessons lessons={ lessons } /> })
  }

  return { items }

}

const getButtons = (user, { fulfillment }) => {

  if(user.id === fulfillment.user.id && !fulfillment.completed_at) {
    return [
      { label: 'Complete Training', color: 'green', modal: <Complete fulfillment={ fulfillment } /> }
    ]
  }

  return null

}

const mapResourcesToPage = (props, context) => ({
  fulfillment: `/api/admin/training/fulfillments/${props.params.id}`,
  materials: `/api/admin/training/fulfillments/${props.params.id}/materials`,
  lessons: `/api/admin/training/fulfillments/${props.params.id}/lessons`,
  quizes: `/api/admin/training/fulfillments/${props.params.id}/quizes`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(props.user, resources),
  buttons: getButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
