import PropTypes from 'prop-types'
import { List } from '@admin'
import pluralize from 'pluralize'
import moment from 'moment'
import React from 'react'

const AssignmentsToken = ({ assigning }, { router }) => (
  <span className="link" onClick={ () => router.history.push(`/training/assignments/report?$filter[assigning_id][$eq]=${assigning.id}`) }>
    Assigned to { pluralize('employee', assigning.assignments_count, true) }
  </span>
)

AssignmentsToken.propTypes = {
  assigning: PropTypes.object
}

AssignmentsToken.contextTypes = {
  router: PropTypes.object
}

const Details = ({ user, assigning }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: assigning.title },
    { label: 'Assigned By', content: assigning.assigned_by.full_name },
    { label: 'Assignments', content: <AssignmentsToken assigning={ assigning } /> },
    { label: 'Due', content: moment(assigning.completed_by).format('MMMM DD, YYYY') }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  assigning: PropTypes.object,
  user: PropTypes.object
}

export default Details
