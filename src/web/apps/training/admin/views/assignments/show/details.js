import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import moment from 'moment'
import React from 'react'

const Details = ({ user, assignment }) => {

  const list = {}

  list.items = [
    { label: 'Assigned By', content: assignment.assigning.assigned_by.full_name },
    { label: 'Employee', content: assignment.user.full_name },
    { label: 'Due', content: moment(assignment.assigning.completed_by).format('MMMM DD, YYYY') },
    { label: 'Options', content: <div>option 1<br />options 2</div> }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  assignment: PropTypes.object,
  user: PropTypes.object
}

export default Details
