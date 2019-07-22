import PropTypes from 'prop-types'
import React from 'react'

const OptionToken = ({ trainings }) => (
  <div className="training-option-token">
    { trainings.map((training, index) => (
      <div className="training-option-token-training" key={`training_${index}`}>
        <strong>{ training.title }</strong> <br />
        <em>Offered { training.type }</em><br />
        { training.description }
      </div>
    )) }
  </div>
)

OptionToken.propTypes = {
  trainings: PropTypes.array
}

export default OptionToken
