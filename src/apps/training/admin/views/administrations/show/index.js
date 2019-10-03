import Administrations from './administrations'
import Answerings from './answerings'
import { Page } from 'maha-admin'
import React from 'react'

const getTabs = (user, { administrations, questions }) => {

  const items = [
    { label: 'Users', component: <Administrations administrations={ administrations } /> },
    { label: 'Questions', component: <Answerings questions={ questions } /> }
  ]


  return { items }

}

const getButtons = (user, { assignment }) => {

  return null

}

const mapResourcesToPage = (props, context) => ({
  administrations: `/api/admin/training/offerings/${props.params.offering_id}/quizes/${props.params.id}/administrations`,
  questions: `/api/admin/training/offerings/${props.params.offering_id}/quizes/${props.params.id}/answerings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Quiz',
  tabs: getTabs(props.user, resources),
  buttons: getButtons(props.user, resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
