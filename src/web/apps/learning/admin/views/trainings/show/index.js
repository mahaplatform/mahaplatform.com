import NewOffering from '../../offerings/new'
import NewQuiz from '../../quizes/new'
import Offerings from './offerings'
import Materials from './materials'
import { Page } from 'maha-admin'
import Lessons from './lessons'
import Details from './details'
import Assign from '../assign'
import Quizes from './quizes'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ training, offerings, lessons, materials, quizes }) => {

  const items = [
    { label: 'Details', component: <Details training={ training } /> }
  ]

  if(training.type === 'local') {
    items.push({ label: 'Materials', component: <Materials materials={ materials } /> })
    items.push({ label: 'Quizes', component: <Quizes training={ training } quizes={ quizes }  /> })
    items.push({ label: 'Offerings', component: <Offerings training={ training } offerings={ offerings } /> })
  }

  if(training.type === 'maha') {
    items.push({ label: 'Lessons', component: <Lessons training={ training } lessons={ lessons } /> })
  }

  return { items }

}

const getTasks = ({ training }) => {

  const items = [
    { label: 'Edit Training', modal: <Edit training={ training } /> },
    { label: 'Assign Training', modal: <Assign training={ training } /> }
  ]

  if(training.type === 'local') {
    items.push({ label: 'Create Quiz', modal: <NewQuiz quizable_type="trainings" quizable_id={ training.id } /> })
    items.push({ label: 'Create Offering', modal: <NewOffering training={ training } /> })
  }

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  training: `/api/admin/learning/trainings/${props.params.id}`,
  lessons: `/api/admin/learning/trainings/${props.params.id}/lessons`,
  materials: `/api/admin/learning/trainings/${props.params.id}/materials`,
  quizes: `/api/admin/learning/trainings/${props.params.id}/quizes`,
  offerings: `/api/admin/learning/trainings/${props.params.id}/offerings`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
