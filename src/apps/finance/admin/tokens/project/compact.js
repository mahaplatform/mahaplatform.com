import PropTypes from 'prop-types'
import React from 'react'

const CompactProjectToken = ({ project }) => {

  if(!project) return null

  return (
    <div className="compact-project-token">
      { project.integration.project_code }
      <span> - </span>
      { project.title }
      { project.is_active === false &&
        <span className="compact-project-token-activity">(INACTIVE)</span>
      }
    </div>
  )

}

CompactProjectToken.propTypes = {
  project: PropTypes.object
}

export default CompactProjectToken
