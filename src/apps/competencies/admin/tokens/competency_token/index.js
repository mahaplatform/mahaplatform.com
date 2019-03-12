import PropTypes from 'prop-types'
import React from 'react'

const CompetencyToken = ({ description, level, title }) => (
  <div className="token competency-token">
    <strong>
      { title }
      { level ? <span> - level { level }</span> : ''}
    </strong><br />
    { description }
  </div>
)

CompetencyToken.propTypes = {
  description: PropTypes.string,
  level: PropTypes.string,
  title: PropTypes.string
}

export default CompetencyToken
