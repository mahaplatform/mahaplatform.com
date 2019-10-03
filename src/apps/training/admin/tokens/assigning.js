import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const AssigningToken = ({ assigned_by, created_at, title }) => (
  <div className="token">
    <strong>{ title }</strong><br />
    By { assigned_by.full_name } on { moment(created_at).format('MM/DD/YYYY') }
  </div>
)

AssigningToken.propTypes = {
  assigned_by: PropTypes.object,
  created_at: PropTypes.string,
  title: PropTypes.string
}

export default AssigningToken
