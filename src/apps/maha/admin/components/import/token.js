import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const ImportToken = ({ id, user, created_at }) => (
  <div className="token">
    <strong>Import #{ id }</strong><br />
    { user.full_name } on
    { moment(created_at).format('MM/DD/YYYY') }
  </div>
)

ImportToken.propTypes = {
  created_at: PropTypes.object,
  id: PropTypes.number,
  user: PropTypes.object
}

export default ImportToken
