import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import Options from '../options'
import moment from 'moment'
import React from 'react'

const Details = ({ user, assignment }) => {

  const list = {}

  list.items = [
    { label: 'Title', content: assignment.assigning.title },
    { label: 'Assigned By', content: assignment.assigning.assigned_by.full_name },
    { label: 'Employee', content: assignment.user.full_name },
    { label: 'Due', content: moment(assignment.assigning.completed_by).format('MMMM DD, YYYY') }
  ]

  if(assignment.is_configured) {
    list.items = list.items.concat(assignment.fulfillments.map((fulfillment, index) => ({
      link: `/admin/training/fulfillments/${fulfillment.id}`,
      content: (
        <div>
          <strong>{ fulfillment.training.title }</strong> <br />
          <em>Offered { fulfillment.training.type }</em><br />
          {fulfillment.training.description }
          { fulfillment.training.type === 'local' && !fulfillment.offering &&
            <span className="error"><br />You have not yet regstered for an offering of this training</span>
          }
        </div>
      )
    })))
    if(user.id == assignment.user.id) {
      list.buttons = [{
        label: 'Change training option',
        color: 'green',
        modal: <Options assignment={ assignment } />
      }]
    }
  } else {
    list.items.push({
      content: (
        <span className="error">There are multiple options for completing this training assignment. You have not yet chosen an option.</span>
      )
    })
    if(user.id == assignment.user.id) {
      list.buttons = [{
        label: 'Select a training option',
        color: 'green',
        modal: <Options assignment={ assignment } />
      }]
    }
  }

  return <List { ...list } />

}

Details.propTypes = {
  assignment: PropTypes.object,
  user: PropTypes.object
}

export default Details
