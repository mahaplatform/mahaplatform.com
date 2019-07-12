import Trainings from './trainings'
import { Page } from 'maha-admin'
import Details from './details'
import React from 'react'

const getTabs = (user, { assignment }) => {

  const items = [
    { label: 'Details', component: <Details user={ user } assignment={ assignment } /> },
    { label: 'Trainings', component: <Trainings user={ user } assignment={ assignment } /> }
  ]


  return { items }

}

const getButtons = (user, { assignment }) => {

  return null

}

const mapResourcesToPage = (props, context) => ({
  assignment: `/api/admin/training/assignments/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Assignment',
  tabs: getTabs(props.user, resources),
  buttons: getButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
