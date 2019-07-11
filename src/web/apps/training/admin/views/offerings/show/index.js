import Fulfillments from './fulfillments'
import { Page } from 'maha-admin'
import Details from './details'
import Reviews from './reviews'
import React from 'react'
import Edit from '../edit'

const getTabs = ({ fulfillments, offering, reviews }) => {

  const items = [
    { label: 'Details', component: <Details offering={ offering } /> },
    { label: 'Attendees', component: <Fulfillments fulfillments={ fulfillments } /> },
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
  offering: `/api/admin/training/trainings/${props.params.training_id}/offerings/${props.params.id}`,
  fulfillments: `/api/admin/training/trainings/${props.params.training_id}/offerings/${props.params.id}/fulfillments`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Offering',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
