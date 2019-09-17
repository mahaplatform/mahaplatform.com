import { List, Logo, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import SettingsEdit from './edit'
import React from 'react'

const Details = ({ team }) => {

  const items = [
    { label: 'Title ', content: team.title },
    { label: 'Team Name ', content: team.subdomain },
    { label: 'Authentication', content: team.authentication_strategy }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  team: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  team: '/api/admin/team/settings'
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.team.title,
  rights: ['team:manage_team'],
  tabs: {
    header: <Logo team={ resources.team } width="120" />,
    items: [
      { label: 'Details', component: <Details team={ resources.team } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Settings',
        modal: SettingsEdit,
        rights: ['team:manage_team']
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
