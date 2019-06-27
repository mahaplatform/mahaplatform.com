import { AppToken, CompactUserToken, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import AssignUsers from './users'
import Edit from './edit'
import React from 'react'

const Details = ({ role }) => {

  const items = [
    { label: 'Title ', content: role.title },
    { label: 'Description ', content: role.description }
  ]

  return <List items={ items } />

}

Details.propTypes = {
  role: PropTypes.object
}

const Users = ({ role, users }) => {

  const list = {
    items: users.map((role_user, index) => ({
      component: <CompactUserToken { ...role_user.user } />
    })),
    empty: {
      icon: 'user-circle',
      title: 'No users',
      text: 'This role has not been assigned to any users',
      button: {
        label: 'Assign Users',
        modal: (props) => <AssignUsers role={ role } users={ users } />
      }
    },
    buttons: [
      {
        label: 'Assign Users',
        color: 'blue',
        modal: <AssignUsers role_id={ role.id } />
      }
    ]

  }

  return <List { ...list } />

}

Users.propTypes = {
  role: PropTypes.object,
  users: PropTypes.array
}

const Access = ({ access }) => {

  const sections = access.map((app, appindex) => ({
    content: !app.installed ? 'This role doesn\'t have access to this app' : null,
    empty: app.installed ? 'This app doesn\'t have any rights' : null,
    items: app.installed ? app.rights.map((right, rightindex) => ({
      icon: right.assigned ? 'check' : 'time',
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
  role: `/api/admin/team/roles/${props.params.id}`,
  users: `/api/admin/team/roles/${props.params.id}/users`,
  access: `/api/admin/team/roles/${props.params.id}/access`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.role.title,
  rights: ['team:manage_people'],
  tabs: {
    items: [
      { label: 'Details', component: <Details role={ resources.role } /> },
      { label: 'Users', component: <Users role={ resources.role } users={ resources.users } /> },
      { label: 'Access', component: <Access access={ resources.access } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Role',
        modal: (props) => <Edit role={ resources.role } />,
        rights: ['team:manage_people']
      }, {
        label: 'Manage Users',
        modal: (props) => <AssignUsers role_id={ resources.role.id } />,
        rights: ['team:manage_people']
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
