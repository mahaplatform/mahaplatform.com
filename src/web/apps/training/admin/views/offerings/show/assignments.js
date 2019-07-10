import { CompactUserToken, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Assignments = ({ assignments }) => {

  const list = {
    items: assignments.map(assignment => ({
      link: `/admin/training/assignments/${assignment.id}`,
      content: assignment,
      component: ({ employee }) => <CompactUserToken { ...employee } />
    })),
    empty: {
      icon: 'user',
      title: 'No attendees',
      text: 'There are no attendees for this offering'
    }
  }

  return <List { ...list } />

}

Assignments.propTypes = {
  assignments: PropTypes.array
}

export default Assignments
