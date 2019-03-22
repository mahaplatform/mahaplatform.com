import PropTypes from 'prop-types'
import React from 'react'

const CommitmentToken = ({ commitment }) => (
  <div className="reframe-list-item-padded">
    { commitment.is_complete &&
      <span className="goal-token-complete">complete</span>
    }
    <strong>{ commitment.resource.title }</strong><br />
    { commitment.resource.description &&
      <span>{ commitment.resource.description }</span>
    }
  </div>
)

CommitmentToken.propTypes = {
  commitment: PropTypes.object
}

export default CommitmentToken
