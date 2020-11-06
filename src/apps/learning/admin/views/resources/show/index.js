import AssignCompetencies from '../competencies'
import Competencies from './competencies'
import { Page } from '@admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ resource, competencies }) => {

  const items = [
    { label: 'Details ', component: <Details resource={ resource } /> },
    { label: 'Competencies ', component: <Competencies resource={ resource } competencies={ competencies } /> }
  ]

  return { items }

}

const getTasks = ({ resource, competencies }) => {

  const items = [
    { label: 'Edit Resource', modal: <Edit id={ resource.id } /> },
    { label: 'Manage Competencies', modal: <AssignCompetencies resource={ resource } competencies={ competencies } /> }
  ]

  return { items }

}

const getButtons = ({ resource, competencies }) => {

  const items = []

  if(resource.url) {
    items.push({
      color: 'red',
      text: 'View Resource',
      link: resource.url
    })
  }

  if(resource.asset) {
    items.push({
      color: 'red',
      text: 'View Resource',
      route: `/admin/assets/${resource.asset.id}`
    })
  }

  return items

}

const mapResourcesToPage = (props, context) => ({
  resource: `/api/admin/learning/resources/${props.params.id}`,
  competencies: `/api/admin/learning/resources/${props.params.id}/competencies`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Resource',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context),
  buttons: getButtons(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
