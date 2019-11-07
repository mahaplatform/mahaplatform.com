import ProgramAccessToken from '../../../tokens/program_access'
import Access from '../../../components/access'
import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import React from 'react'

const ProgramAccess = ({ accesses, program }) => {

  const list = {
    items: accesses.map((access, index) => ({
      component: (props) => <ProgramAccessToken access={ access } />
    })),
    empty: {
      icon: 'user-circle',
      title: 'No access',
      text: 'This programs has no authorized users',
      button: {
        label: 'Manage Access',
        modal: <Access program_id={ program.id } />
      }
    },
    buttons: program.access_type === 'manage' ? [
      { label: 'Manage Access', color: 'blue', modal: <Access program_id={ program.id } /> }
    ] : null
  }

  return <List { ...list } />

}

ProgramAccess.propTypes = {
  accesses: PropTypes.array,
  program: PropTypes.object
}

export default ProgramAccess
