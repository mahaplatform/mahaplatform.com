import Registration from '../registration'
import { List } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const Details = ({ assignment }) => {

  const list = {}

  if(assignment.is_complete) {
    list.alert = { color: 'green', message: 'This training is completed' }
  }

  list.items = [
    { label: 'Training', content: assignment.training.title },
    { label: 'Assigned By', content: assignment.assigned_by.full_name },
    { label: 'Employee', content: assignment.employee.full_name }
  ]

  if(assignment.training.url) {
    list.items.push({ label: 'URL', content: <a href={ assignment.training.url } target="_blank">{ assignment.training.url }</a> })
  }
  if(assignment.training.location) {
    list.items.push({ label: 'Location', content: assignment.training.location })
  }
  if(assignment.training.contact) {
    list.items.push({ label: 'Contact', content: assignment.training.contact })
  }

  if(assignment.training.type === 'local') {
    if(assignment.offering) {
      list.items.push({
        label: 'Registration',
        content: (
          <div>
            { moment(assignment.offering.date).format('dddd, MMMM DD, YYYY') }<br />
            Time: { moment(`2019-01-01 ${assignment.offering.starts_at}`).format('hh:mm A') } - { moment(`2019-01-01 ${assignment.offering.ends_at}`).format('hh:mm A') }<br />
            Facilitator: {assignment.offering.facilitator }<br />
            Location: {assignment.offering.location }
          </div>
        )
      })
      list.buttons = [{
        label: 'Change Registration',
        color: 'green',
        modal: <Registration assignment={ assignment } />
      }]
    } else {
      list.items.push({
        label: 'Registration',
        content: (
          <span className="error">You have not yet registered to attend an offering of this training</span>
        )
      })
      list.buttons = [{
        label: 'Register for a training',
        color: 'green',
        modal: <Registration assignment={ assignment } />
      }]
    }
  }

  return <List { ...list } />

}

Details.propTypes = {
  assignment: PropTypes.object
}

export default Details
