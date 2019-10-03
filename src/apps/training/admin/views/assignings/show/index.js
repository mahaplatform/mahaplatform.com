import { Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = (user, { assigning }) => {

  const items = [
    { label: 'Details', component: <Details assigning={ assigning } /> }
  ]


  return { items }

}

const getTasks = (user, { assigning }) => {

  const items = [
    { label: 'Edit Assigning', modal: <Edit assigning={ assigning } /> }
  ]


  return { items }

}

const getButtons = (user, { assignment }) => {

  return null

}

const mapResourcesToPage = (props, context) => ({
  assigning: `/api/admin/training/assignings/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Assigning',
  tabs: getTabs(props.user, resources),
  tasks: getTasks(props.user, resources),
  buttons: getButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
