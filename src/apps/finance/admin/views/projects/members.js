import MembershipToken from '../../tokens/membership'
import Memberships from '../memberships/users'
import { List } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Members = ({ memberships, project, rights, user }) => {

  const allowed = (memberships, rights, user) => {
    return _.includes(rights, 'finance:manage_configuration') || memberships.find(membership => {
      return  membership.user.id === user.id && membership.type === 'owner'
    }) !== undefined
  }

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

export default Members
