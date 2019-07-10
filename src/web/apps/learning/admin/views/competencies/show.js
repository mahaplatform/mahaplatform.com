import ResourceToken from '../../tokens/resource_token'
import AssignResources from './resources'
import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import Edit from './edit'
import React from 'react'

const Details = ({ competency }) => {

  const list = {
    items: [
      { label: 'Title', content: competency.title },
      { label: 'Description', content: competency.description },
      { label: 'Category', content: competency.category },
      { label: 'Level', content: competency.level }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  competency: PropTypes.object
}

const Resources = ({ competency, resources }) => {

  const list = {
    items: resources.map(resource => ({
      content: resource,
      component: ResourceToken
    })),
    empty: {
      icon: 'cube',
      title: 'No Resources',
      text: 'There are no resources for this competency',
      button: {
        label: 'Manage Resources',
        modal: <AssignResources competency={ competency } resources={ resources } />
      }
    }
  }

  return <List { ...list } />

}

Resources.propTypes = {
  competency: PropTypes.object,
  resources: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  competency: `/api/admin/learning/competencies/${props.params.id}`,
  resources: `/api/admin/learning/competencies/${props.params.id}/resources`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Competency',
  tabs: {
    items: [
      { label: 'Details', component: <Details competency={ resources.competency } /> },
      { label: 'Resources', component: <Resources competency={ resources.competency } resources={ resources.resources } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit Competency', modal: <Edit id={ resources.competency.id } /> },
      { label: 'Manage Resources', modal: <AssignResources competency={ resources.competency } resources={ resources.resources } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
