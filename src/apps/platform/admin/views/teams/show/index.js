import { Logo, Page } from '@admin'
import Details from './details'
import Delete from '../delete'
import User from '../user'
import Edit from '../edit'
import Apps from './apps'
import React from 'react'

const getTabs = ({ team, apps, banks }) => ({
  header: <Logo team={ team } width="120" />,
  items:  [
    { label: 'Details', component: <Details team={ team } /> },
    { label: 'Apps', component: <Apps apps={ apps } /> }
  ]
})

const getTasks = ({ team }) => ({
  items: [
    {
      label: 'Edit Team',
      modal: <Edit team_id={ team.id } />
    }, {
      label: 'Disable Team',
      show: team.is_active,
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/platform/teams/${team.id}/activate`,
        body: { is_active: false },
        onFailure: (result) => context.flash.set('error', 'Unable to disable team')
      }
    }, {
      label: 'Enable Team',
      show: !team.is_active,
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/platform/teams/${team.id}/activate`,
        body: { is_active: true },
        onFailure: (result) => context.flash.set('error', 'Unable to enable team')
      }
    }, {
      label: 'Create User',
      modal: <User team_id={ team.id } />
    }, {
      label: 'Delete Team',
      modal: {
        component: <Delete team={ team } />,
        options: {
          width: 400,
          height: 280
        }
      }
    }
  ]
})

const mapResourcesToPage = (props, context) => ({
  apps: `/api/admin/platform/teams/${props.params.id}/apps`,
  team: `/api/admin/platform/teams/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.team.title,
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
