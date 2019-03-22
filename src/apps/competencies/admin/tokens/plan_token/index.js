import React from 'react'
import moment from 'moment'

const plural = (quantity, singular, plural) => {
  return quantity === 1 ? `${quantity} ${singular}` : `${quantity} ${plural}`
}

const PlanToken = (plan) => (
  <div className="plan-token">
    <div className="plan-token-details">
      <strong>{ moment(plan.due).format('MMMM DD, YYYY') }</strong><br />
      { plural(plan.goal_count, 'goal', 'goals') } / { plural(plan.commitment_count, 'commitment', 'commitments') }
    </div>
  </div>
)

export default PlanToken
