import Merchants from './merchants'
import { Page } from 'maha-admin'
import Details from './details'
import Delete from '../delete'
import Edit from '../edit'
import Apps from './apps'
import React from 'react'

const getTabs = ({ team, apps, merchants }) => ({
  items:  [
    { label: 'Details', component: <Details team={ team } /> },
    { label: 'Apps', component: <Apps apps={ apps } /> },
    { label: 'Bank Accounts', component: <Merchants team={ team } merchants={ merchants } /> }
  ]
})

const getTasks = ({ team }) => ({
  items: [
    {
      label: 'Edit Team',
      modal: <Edit team_id={ team.id } />
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
  merchants: `/api/admin/platform/teams/${props.params.id}/merchants`,
  team: `/api/admin/platform/teams/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.team.title,
  tabs: getTabs(resources),
  tasks: getTasks(resources)
})

export default Page(mapResourcesToPage, mapPropsToPage)
