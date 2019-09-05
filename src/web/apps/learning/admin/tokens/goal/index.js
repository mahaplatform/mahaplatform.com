import PropTypes from 'prop-types'
import React from 'react'

const GoalToken = ({ goal }) => (
  <div className="goal-token">
    { goal.is_complete &&
      <span className="goal-token-complete">complete</span>
    }
    <strong>
      { goal.competency.title }
      { goal.competency.level ? ` - level ${goal.competency.level}` : ''}
    </strong>
    <br />
    { goal.competency.description &&
      <span>{ goal.competency.description }</span>
    }
    { goal.description &&
      <div className="goal-token-description">
        { goal.description }
      </div>
    }
  </div>
)

GoalToken.propTypes = {
  goal: PropTypes.object
}

export default GoalToken
