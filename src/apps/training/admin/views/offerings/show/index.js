import Fulfillments from './fulfillments'
import Materials from './materials'
import { Page } from '@admin'
import Details from './details'
import Reviews from './reviews'
import Quizes from './quizes'
import React from 'react'
import Edit from '../edit'

const getTabs = ({ fulfillments, materials, offering, reviews, quizes }) => {

  const items = [
    { label: 'Details', component: <Details offering={ offering } /> },
    { label: 'Attendees', component: <Fulfillments fulfillments={ fulfillments } /> },
    { label: 'Materials', component: <Materials materials={ materials } /> },
    { label: 'Quizes', component: <Quizes offering={ offering } quizes={ quizes } /> },
    { label: 'Reviews', component: <Reviews reviews={ reviews } /> }
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
  offering: `/api/admin/training/offerings/${props.params.id}`,
  fulfillments: `/api/admin/training/offerings/${props.params.id}/fulfillments`,
  materials: `/api/admin/training/offerings/${props.params.id}/materials`,
  quizes: `/api/admin/training/offerings/${props.params.id}/quizes`,
  reviews: `/api/admin/training/offerings/${props.params.id}/reviews`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Offering',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
