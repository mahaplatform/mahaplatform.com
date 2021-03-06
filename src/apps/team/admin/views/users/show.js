import { AppToken, Avatar, List, Page } from '@admin'
import Notifications from './notifications'
import PropTypes from 'prop-types'
import Disable from './disable'
import Enable from './enable'
import React from 'react'
import Edit from './edit'

const Details = ({ user, appUserValues }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Email', content: user.email },
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

  if(!user.is_active) {
    list.alert = { color: 'red', message: 'This user has been disabled' }
  } else if(!user.activated_at) {
    list.alert = { color: 'grey', message: 'This user hasn\'t yet activated their account' }
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

Access.propTypes = {
  access: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  user: `/api/admin/team/users/${props.params.id}`,
  access: `/api/admin/team/users/${props.params.id}/access`,
  notifications: `/api/admin/team/users/${props.params.id}/notifications`
})

const mapPropsToPage = (props, context, resources) => ({
  title: resources.user.full_name,
  rights: ['team:manage_people'],
  tabs: {
    header: <Avatar user={ resources.user } width="120" presence={ false } />,
    items: [
      { label: 'Details', component: <Details user={ resources.user } appUserValues={ context.configuration.appUserValues } /> },
      { label: 'Access', component: <Access access={ resources.access } /> },
      { label: 'Notifications', component: <Notifications notifications={ resources.notifications } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit User',
        modal: () => <Edit user={ resources.user } />,
        rights: ['team:manage_people']
      }, {
        label: 'Disable User',
        rights: ['team:manage_people'],
        show: resources.user.is_active,
        modal: () => <Disable user={ resources.user } />
      }, {
        label: 'Enable User',
        rights: ['team:manage_people'],
        show: !resources.user.is_active,
        modal: () => <Enable user={ resources.user } />
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
      ], [])
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
