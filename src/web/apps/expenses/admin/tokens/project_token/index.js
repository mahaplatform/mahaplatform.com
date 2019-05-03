import PropTypes from 'prop-types'
import React from 'react'

const ProjectToken = ({ integration, title }) => (
  <div className="token project-token">
    { integration && integration.project_code && <strong>{ integration.project_code  } - </strong> }
    { title }
  </div>
)

ProjectToken.propTypes = {
  integration: PropTypes.string,
  title: PropTypes.string
}

export default ProjectToken
