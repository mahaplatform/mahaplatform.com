import Questions from '../../../components/questions'
import { Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ quiz, questions }) => {

  const items = [
    { label: 'Details ', component: <Details quiz={ quiz } /> },
    { label: 'Questions ', component: <Questions quiz={ quiz } questions={ questions } /> }
  ]

  return { items }

}

const getTasks = ({ quiz }) => {

  const items = [
    { label: 'Edit Quiz', modal: <Edit id={ quiz.id } /> }
  ]

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  quiz: `/api/admin/learning/quizes/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Quiz',
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
