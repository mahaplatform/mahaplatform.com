import PropTypes from 'prop-types'
import React from 'react'

const FilenameToken = ({ original_file_name, source }) => (
  <div className="filename-token">
    <div className="filename-token-icon">
      <img src={`/images/services/${source}.png`} width="16" height="16" />
    </div>
    <div className="filename-token-label">
      { original_file_name }
    </div>
  </div>
)

FilenameToken.propTypes = {
  original_file_name: PropTypes.string,
  source: PropTypes.string
}

export default FilenameToken
