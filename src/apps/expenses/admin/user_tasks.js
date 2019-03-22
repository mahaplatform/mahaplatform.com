import Memberships from './views/memberships/projects'
import React from 'react'

const userTasks = (user, context) => {
  return [
    {
      label: 'Manage Projects',
      rights: ['expenses:manage_configuration'],
      show: user.is_active,
      modal: <Memberships user_id={ user.id } />
    }
  ]
}

export default userTasks
