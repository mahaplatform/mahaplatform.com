import PropTypes from 'prop-types'
import React from 'react'

const types = {
  local: {
    title: 'Local Training',
    description: 'This training is offered internally and registration will be managed through Maha'
  },
  remote: {
    title: 'Remote Training',
    description: 'This training is offered by an external organization and registration will be handled outside of Maha'
  },
  online: {
    title: 'Online Training',
    description: 'This training is offered elsewhere on the Internet as either a webinar or eLearning module'
  },
  maha: {
    title: 'Maha Training',
    description: 'This training is designed within and offered directly through Maha'
  }
}

const TrainingTypeToken = ({ text, value }) => (
  <div className="training-type-token token">
    <strong>{ types[value].title }</strong><br />
    { types[value].description }
  </div>
)

TrainingTypeToken.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string
}

export default TrainingTypeToken
