import NewQuiz from '../../quizes/new'
import Materials from './materials'
import { Page } from '@admin'
import Lessons from './lessons'
import Details from './details'
import Quizes from './quizes'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ training, lessons, materials, quizes }) => {

  const items = [
    { label: 'Details', component: <Details training={ training } /> }
  ]

  if(training.type === 'local') {
    items.push({ label: 'Materials', component: <Materials materials={ materials } /> })
    items.push({ label: 'Quizes', component: <Quizes training={ training } quizes={ quizes }  /> })
  }

  if(training.type === 'maha') {
    items.push({ label: 'Lessons', component: <Lessons training={ training } lessons={ lessons } /> })
  }

  return { items }

}

const getTasks = ({ training }) => {

  const items = [
    { label: 'Edit Training', modal: <Edit training={ training } /> }
  ]

  if(training.type === 'local') {
    items.push({ label: 'Create Quiz', modal: <NewQuiz quizable_type="trainings" quizable_id={ training.id } /> })
  }

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  training: `/api/admin/training/trainings/${props.params.id}`,
  lessons: `/api/admin/training/trainings/${props.params.id}/lessons`,
  materials: `/api/admin/training/trainings/${props.params.id}/materials`,
  quizes: `/api/admin/training/trainings/${props.params.id}/quizes`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Training',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
