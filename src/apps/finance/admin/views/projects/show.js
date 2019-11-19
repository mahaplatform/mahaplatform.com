import CompactProjectToken from '../../tokens/project/compact'
import MembershipToken from '../../tokens/membership'
import Memberships from '../memberships/users'
import { Audit, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
import _ from 'lodash'

const Details = ({ project, integration }) => {

  const list = {
    title: 'Project Details',
    items: [
      { label: 'Title', content: project.title },
      { label: 'Type', content: project.type.toUpperCase() },
      { label: 'Tax Account', content: { project: project.tax_project }, format: CompactProjectToken }
    ]
  }

  if(integration === 'accpac') {
    list.items = list.items.concat([
      { label: 'Main Project Code', content: project.integration.main_project_code },
      { label: 'Project Code', content: project.integration.project_code },
      { label: 'Program Code', content: project.integration.program_code },
      { label: 'Source Code', content: project.integration.source_code },
      { label: 'Match', content: project.integration.match }
    ])
  }

  list.items = list.items.concat([
    { component: <Audit entries={ project.audit } /> }
  ])

  if(!project.is_active) {
    list.alert = {
      color: 'red',
      message: 'This project has been disabled'
    }
  }

  return <List { ...list } />

}

Details.propTypes = {
  integration: PropTypes.string,
  project: PropTypes.object
}

const Members = ({ memberships, project, rights, user }) => {

  const list = {
    items: memberships.map((membership, index) => ({
      component: (props) => <MembershipToken type="user" membership={ membership } />
    })),
    empty: {
      icon: 'user-circle',
      title: 'No members',
      text: 'This project does not yet have any members',
      button: {
        label: 'Manage Members',
        modal: <Memberships project_id={ project.id } />
      }
    },
    buttons: allowed(memberships, rights, user) ? [
      { label: 'Manage Members', color: 'blue', modal: <Memberships project_id={ project.id } /> }
    ] : null
  }

  return <List { ...list } />

}

Members.propTypes = {
  memberships: PropTypes.array,
  project: PropTypes.object,
  rights: PropTypes.array,
  user: PropTypes.object
}

const allowed = (memberships, rights, user) => {
  return _.includes(rights, 'finance:manage_configuration') || memberships.find(membership => {
    return  membership.user.id === user.id && membership.type === 'owner'
  }) !== undefined
}

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/finance/settings',
  project: `/api/admin/finance/projects/${props.params.id}`,
  memberships: `/api/admin/finance/projects/${props.params.id}/memberships`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Project',
  tabs: {
    items: [
      { label: 'Details', component: <Details project={ resources.project } integration={ resources.app.settings.integration } /> },
      { label: 'Members', component: <Members project={ resources.project } memberships={ resources.memberships } rights={ props.rights } user={ props.user } /> }
    ]
  },
  tasks: allowed(resources.memberships, props.rights, props.user) ? {
    items: [
      {
        label: 'Edit Project',
        rights: ['finance:manage_configuration'],
        show: resources.project.is_active,
        modal: <Edit project={ resources.project } integration={ resources.app.settings.integration } />
      }, {
        label: 'Disable Project',
        rights: ['finance:manage_configuration'],
        show: resources.project.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/finance/projects/${resources.project.id}/disable`,
          onFailure: (result) => context.flash.set('error', 'Unable to disable this project')
        }
      }, {
        label: 'Enable Project',
        rights: ['finance:manage_configuration'],
        show: !resources.project.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/finance/projects/${resources.project.id}/enable`,
          onFailure: (result) => context.flash.set('error', 'Unable to enable this project')
        }
      },{
        label: 'Manage Members',
        show: resources.project.is_active,
        modal: <Memberships project_id={ resources.project.id } />
      }
    ]
  } : null
})

export default Page(mapResourcesToPage, mapPropsToPage)
