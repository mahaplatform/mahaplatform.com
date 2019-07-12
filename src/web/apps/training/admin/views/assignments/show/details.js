import OptionToken from '../../../tokens/option_token'
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

  if(assignment.option) {
    list.items.push({
      label: 'Option',
      content: (
        <div className="training-option-token">
          { assignment.option.trainings.map((training, index) => (
            <div className="training-option-token-training" key={`training_${index}`}>
              <strong>{ training.title }</strong> <br />
              <em>Offered { training.type }</em><br />
              { training.description }<br />
              You have not yet regstered for an offering of this traing
            </div>
          )) }
        </div>
      )
    })
    if(user.id == assignment.user.id) {
      list.buttons = [{
        label: 'Change option',
        color: 'green',
        modal: <Options assignment={ assignment } />
      }]
    }
  } else {
    list.items.push({
      label: 'Option',
      content: (
        <span className="error">There are multiple options for completing this training assignment. You have not yet chosen an option.</span>
      )
    })
    if(user.id == assignment.user.id) {
      list.buttons = [{
        label: 'Select an option',
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
