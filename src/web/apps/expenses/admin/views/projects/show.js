import MembershipToken from '../../tokens/membership_token'
import Memberships from '../memberships/users'
import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

const Details = ({ project, integration }) => {

  const list = {
    sections: [
      {
        title: 'Project Details',
        items: [
          { label: 'Title', content: project.title }
        ]
      }
    ]
  }

  if(integration === 'accpac') {
    list.sections.push({
      title: 'ACCPAC Details',
      items: [
        { label: 'Project Code', content: project.integration.project_code },
        { label: 'Program Code', content: project.integration.program_code },
        { label: 'Source Code', content: project.integration.source_code },
        { label: 'Match', content: project.integration.match }
      ]
    })
  }

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

const Members = ({ project, memberships }) => {

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
    buttons: [
      { label: 'Manage Members', color: 'blue', modal: <Memberships project_id={ project.id } /> }
    ]
  }

  return <List { ...list } />

}

Members.propTypes = {
  memberships: PropTypes.array,
  project: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  app: '/api/admin/apps/expenses/settings',
  project: `/api/admin/expenses/projects/${props.params.id}`,
  memberships: `/api/admin/expenses/projects/${props.params.id}/memberships`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Project',
  tabs: {
    items: [
      { label: 'Details', component: <Details project={ resources.project } integration={ resources.app.settings.integration } /> },
      { label: 'Members', component: <Members project={ resources.project } memberships={ resources.memberships } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Project',
        rights: ['expenses:manage_configuration'],
        show: resources.project.is_active,
        modal: <Edit project={ resources.project } integration={ resources.app.settings.integration } />
      }, {
        label: 'Disable Project',
        rights: ['expenses:manage_configuration'],
        show: resources.project.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/expenses/projects/${resources.project.id}/disable`,
          onFailure: (result) => context.flash.set('error', 'Unable to disable this project')
        }
      }, {
        label: 'Enable Project',
        rights: ['expenses:manage_configuration'],
        show: !resources.project.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/expenses/projects/${resources.project.id}/enable`,
          onFailure: (result) => context.flash.set('error', 'Unable to enable this project')
        }
      },{
        label: 'Manage Members',
        show: resources.project.is_active,
        modal: <Memberships project_id={ resources.project.id } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
