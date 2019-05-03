import { AppToken, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

const Details = ({ team }) => {

  const items = [
    { label: 'Title ', content: team.title },
    { label: 'Team Name ', content: team.subdomain }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  team: PropTypes.object
}

const Apps = ({ apps }) => {

  const items = apps.map((app, index) => ({
    component: <AppToken { ...app } />,
  extra: app.installed ? <span class="red">INSTALLED</span> : null
  }))

  return <List items={ items } />

}

Apps.propTypes = {
  apps: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  apps: `/api/admin/platform/teams/${props.params.id}/apps`,
  team: `/api/admin/platform/teams/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.team.title,
  tabs: {
    items: [
      { label: 'Details', component: <Details team={ resources.team } /> },
      { label: 'Apps', component: <Apps apps={ resources.apps } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Team',
        modal: <Edit team={ resources.team } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
