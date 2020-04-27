import PropTypes from 'prop-types'
import React from 'react'

const FilenameToken = ({ original_file_name, source }) => (
  <div className="token">
    <img src={`/admin/images/services/${source}.png`} width="16" height="16" />
    { original_file_name }
  </div>
)

FilenameToken.propTypes = {
  original_file_name: PropTypes.string,
  source: PropTypes.string
}

export default FilenameToken
