import { List, Page, UserToken } from 'maha-admin'
import PropTypes from 'prop-types'
import AssignUsers from './users'
import Edit from './edit'
import React from 'react'

const Users = ({ group, users }) => {

  const list = {
    items: users.map((group_user, index) => ({
      component: <UserToken { ...group_user.user } />
    })),
    empty: {
      icon: 'user-circle',
      title: 'No users',
      text: 'This group has not been assigned to any users',
      button: {
        label: 'Assign Users',
        modal: <AssignUsers group_id={ group.id } />
      }
    },
    buttons: [
      {
        label: 'Assign Users',
        color: 'blue',
        modal: <AssignUsers group_id={ group.id } />
      }
    ]
  }

  return <List { ...list } />

}

Users.propTypes = {
  group: PropTypes.object,
  users: PropTypes.array
}

const mapResourcesToPage = (props, context) => ({
  group: `/api/admin/team/groups/${props.params.id}`,
  users: `/api/admin/team/groups/${props.params.id}/users`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.group.title,
  rights: ['team:manage_people'],
  panel: {
    component: <Users group={ resources.group } users={ resources.users } />
  },
  tasks: {
    items: [
      {
        label: 'Edit Group',
        modal: <Edit group={ resources.group } />,
        rights: ['team:manage_people']
      }, {
        label: 'Manage Users',
        modal: <AssignUsers group_id={ resources.group.id } />,
        rights: ['team:manage_people']
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
