import PropTypes from 'prop-types'
import React from 'react'

const ProjectToken = ({ integration, is_active, title }) => (
  <div className="token project-token">
    { integration && integration.project_code && <strong>{ integration.project_code  } - </strong> }
    { title }
    { is_active === false &&
      <span className="compact-project-token-activity">(INACTIVE)</span>
    }
  </div>
)

ProjectToken.propTypes = {
  integration: PropTypes.string,
  is_active: PropTypes.bool,
  title: PropTypes.string
}

export default ProjectToken
