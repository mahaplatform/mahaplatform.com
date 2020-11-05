import ProgramToken from '@apps/crm/admin/tokens/program'
import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Programs = ({ programs }) => {

  const items = programs.map((program, index) => ({
    component: <ProgramToken { ...program.program } />
  }))

  return <List items={ items } />

}

Programs.propTypes = {
  programs: PropTypes.array
}

export default Programs
