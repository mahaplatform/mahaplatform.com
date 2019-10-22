import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const Access = ({ access }) => {

  const list = {
    // items: memberships.map((membership, index) => ({
    //   component: (props) => <MembershipToken type="user" membership={ membership } />
    // })),
    // empty: {
    //   icon: 'user-circle',
    //   title: 'No members',
    //   text: 'This project does not yet have any members',
    //   button: {
    //     label: 'Manage Members',
    //     modal: <Memberships project_id={ project.id } />
    //   }
    // },
    // buttons: allowed(memberships, rights, user) ? [
    //   { label: 'Manage Members', color: 'blue', modal: <Memberships project_id={ project.id } /> }
    // ] : null
  }

  return <List { ...list } />

}

Access.propTypes = {
  access: PropTypes.array
}

export default Access
