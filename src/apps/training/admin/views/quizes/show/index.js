import { Page } from 'maha-admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ quiz, questions }) => {

  const items = [
    { label: 'Details ', component: <Details quiz={ quiz } /> }
  ]

  return { items }

}

const getTasks = ({ quiz }) => {

  const items = [
    { label: 'Edit Quiz', modal: <Edit quiz={ quiz } /> }
  ]

  return { items }

}

const mapResourcesToPage = (props, context) => ({
  quiz: `/api/admin/training/quizes/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Quiz',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
