import CompetencyToken from '../../tokens/competency_token'
import AssignCompetencies from './competencies'
import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

const Details = ({ resource }) => {

  const items = [
    { label: 'Title ', content: resource.title },
    { label: 'Description ', content: resource.description }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  resource: PropTypes.object
}

const Competencies = ({ resource, competencies }) => {

  const list = {
    items: competencies.map(competency => ({
      content: competency,
      component: CompetencyToken
    })),
    empty: {
      icon: 'trophy',
      title: 'No Competencies',
      text: 'This resource is not assigned to any competencies',
      button: {
        label: 'Manage Competencies',
        modal: <AssignCompetencies resource={ resource } competencies={ competencies } />
      }
    }
  }

  return <List { ...list } />

}

Competencies.propTypes = {
  resource: PropTypes.object,
  competencies: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  resource: `/api/admin/competencies/resources/${props.params.id}`,
  competencies: `/api/admin/competencies/resources/${props.params.id}/competencies`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Resource',
  tabs: {
    items: [
      { label: 'Details ', component: <Details resource={ resources.resource } /> },
      { label: 'Competencies ', component: <Competencies resource={ resources.resource } competencies={ resources.competencies } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit Resource', modal: <Edit id={ resources.resource.id } /> },
      { label: 'Manage Competencies', modal: <AssignCompetencies resource={ resources.resource } competencies={ resources.competencies } /> }
    ]
  },
  buttons: [
    ...resources.resource.url ? [{
      color: 'red',
      text: 'View Resource Online',
      link: resources.resource.url
    }] : [],
    ...resources.resource.asset ? [{
      color: 'red',
      text: 'View Asset',
      route: `/admin/assets/${resources.resource.asset.id}`
    }] : []
  ]
})

export default Page(mapResourcesToPage, mapPropsToPage)
