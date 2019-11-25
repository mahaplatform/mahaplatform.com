import Memberships from '../memberships/users'
import { Page } from 'maha-admin'
import Details from './details'
import Members from './members'
import React from 'react'
import Edit from './edit'
import _ from 'lodash'

const getTabs = ({ app, memberships, project }, { rights, user }) => ({
  items: [
    { label: 'Details', component: <Details project={ project } integration={ app.settings.integration } /> },
    { label: 'Members', component: <Members project={ project } memberships={ memberships } rights={ rights } user={ user } /> }
  ]
})

const getTasks = ({ app, memberships, project }, { rights, user }, context) => {

  const allowed = _.includes(rights, 'finance:manage_configuration') || memberships.find(membership => {
    return  membership.user.id === user.id && membership.type === 'owner'
  }) !== undefined

  return allowed ? {
    items: [
      {
        label: 'Edit Project',
        rights: ['finance:manage_configuration'],
        show: project.is_active,
        modal: <Edit project={ project } integration={ app.settings.integration } />
      }, {
        label: 'Disable Project',
        rights: ['finance:manage_configuration'],
        show: project.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/finance/projects/${project.id}/disable`,
          onFailure: (result) => context.flash.set('error', 'Unable to disable this project')
        }
      }, {
        label: 'Enable Project',
        rights: ['finance:manage_configuration'],
        show: !project.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/finance/projects/${project.id}/enable`,
          onFailure: (result) => context.flash.set('error', 'Unable to enable this project')
        }
      },{
        label: 'Manage Members',
        show: project.is_active,
        modal: <Memberships project_id={ project.id } />
      }
    ]
  } : null
}

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  project: `/api/admin/finance/projects/${props.params.id}`,
  memberships: `/api/admin/finance/projects/${props.params.id}/memberships`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Project',
  tabs: getTabs(resources, props),
  tasks: getTasks(resources, props, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
