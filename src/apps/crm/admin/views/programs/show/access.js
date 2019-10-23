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
    // empty: {
    //   icon: 'user-circle',
    //   title: 'No members',
    //   text: 'This project does not yet have any members',
    //   button: {
    //     label: 'Manage Members',
    //     modal: <Memberships project_id={ project.id } />
    //   }
    // },
    buttons: [
      { label: 'Manage Access', color: 'blue', modal: <Access program_id={ program.id } /> }
    ]
  }

  return <List { ...list } />

}

ProgramAccess.propTypes = {
  access: PropTypes.array
}

export default ProgramAccess
