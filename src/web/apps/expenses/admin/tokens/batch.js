import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const BatchToken = ({ id, user, created_at }) => (
  <div className="token">
    <strong>Batch #{ id }</strong><br />
    { user.full_name } on { moment(created_at).format('MM/DD/YYYY') }
  </div>
)

BatchToken.propTypes = {
  created_at: PropTypes.object,
  id: PropTypes.number,
  user: PropTypes.object
}

export default BatchToken
