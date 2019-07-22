import ResourceToken from '../../../tokens/resource'
import AssignResources from '../resources'
import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

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

export default Resources
