import { UserToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import AssignUsers from '../users'
import React from 'react'

const Users = ({ role, users }) => {

  const list = {
    items: users.map((role_user, index) => ({
      component: <UserToken { ...role_user.user } />
    })),
    empty: {
      icon: 'user-circle',
      title: 'No users',
      text: 'This role has not been assigned to any users',
      button: {
        label: 'Assign Users',
        modal: (props) => <AssignUsers role_id={ role.id } />
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

export default Users
