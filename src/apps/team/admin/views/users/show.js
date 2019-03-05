import { AppToken, Avatar, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

const Details = ({ user, appUserValues }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Email', content: user.email },
          { label: 'Secondary Email', content: user.secondary_email },
          { label: 'Notifications', content: user.email_notifications_method },
          { label: 'Roles', content: user.roles.map(role => role.title).join(', ') },
          { label: 'Groups', content: user.groups.map(group => group.title).join(', ') },
          { label: 'Supervisors', content: user.supervisors.map(supervisor => supervisor.full_name).join(', ') }
        ]
      },
      ...appUserValues.reduce((values, appUserValues) => [
        ...values,
        ...appUserValues(user)
      ], [])
    ]
  }

  if(!user.activated_at) {
    list.alert = { color: 'grey', message: 'This user hasn\'t yet activated their account' }
  } else if(!user.is_active) {
    list.alert = { color: 'red', message: 'This user has been disabled' }
  }


  return <List { ...list } />

}

Details.propTypes = {
  appUserValues: PropTypes.array,
  user: PropTypes.object
}

const Access = ({ access }) => {

  const sections = access.map((app, appindex) => ({
    content: !app.installed ? 'This user doesn\'t have access to this app' : null,
    empty: app.installed ? 'This app doesn\'t have any rights' : null,
    items: app.installed ? app.rights.map((right, rightindex) => ({
      icon: right.assigned ? 'check' : 'times',
      content: <span><strong>{ right.title }</strong><br />{ right.description }</span>
    })) : [],
    title: <AppToken { ...app } />
  }))

  return <List className="app-access" sections={ sections } />

}

const mapResourcesToPage = (props, context) => ({
  user: `/api/admin/team/users/${props.params.id}`,
  access: `/api/admin/team/users/${props.params.id}/access`
})

Access.propTypes = {
  access: PropTypes.array
}

const mapPropsToPage = (props, context, resources) => ({
  title: resources.user.full_name,
  rights: ['team:manage_people'],
  tabs: {
    header: <Avatar user={ resources.user } width="120" presence={ false } />,
    items: [
      { label: 'Details', component: <Details user={ resources.user } appUserValues={ context.configuration.appUserValues } /> },
      { label: 'Access', component: <Access access={ resources.access } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit User',
        modal: () => <Edit user={ resources.user } token={ props.team.token } />,
        rights: ['team:manage_people']
      }, {
        label: 'Disable User',
        rights: ['team:manage_people'],
        show: resources.user.activated_at !== null && resources.user.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/team/users/${resources.user.id}/disable`,
          onFailure: (result) => context.flash.set('error', 'Unable to disable this user')
        }
      }, {
        label: 'Enable User',
        rights: ['team:manage_people'],
        show: resources.user.activated_at !== null && !resources.user.is_active,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/team/users/${resources.user.id}/enable`,
          onFailure: (result) => context.flash.set('error', 'Unable to enable this user')
        }
      },{
        label: 'Resend Activation Email',
        rights: ['team:manage_people'],
        show: resources.user.activated_at === null,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/team/users/${resources.user.id}/activate`,
          onFailure: (result) => context.flash.set('error', 'Unable to resend activation'),
          onSuccess: (result) => context.flash.set('success', `An activation email has been resent to ${resources.user.email}`)
        }
      },
      ...context.configuration.appUserTasks.reduce((tasks, appUserTasks) => [
        ...tasks,
        ...appUserTasks(resources.user, context)
      ], []),
      {
        label: 'Reset Password',
        rights: ['team:manage_people'],
        show: resources.user.is_active && resources.user.activated_at !== null,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/team/users/${resources.user.id}/reset`,
          onFailure: (result) => context.flash.set('error', 'Unable to reset the users password'),
          onSuccess: (result) => context.flash.set('success', `A reset email has been sent to ${resources.user.email}`)
        }
      }, {
        label: 'Sign Out of All Devices',
        rights: ['team:manage_people'],
        show: resources.user.is_active && resources.user.activated_at !== null,
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/team/users/${resources.user.id}/signout`,
          onFailure: (result) => context.flash.set('error', 'Unable to sign out this user'),
          onSuccess: (result) => context.flash.set('success', 'The user has been signed out of all devices')
        }
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
