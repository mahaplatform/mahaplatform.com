import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'
import numeral from 'numeral'

const BatchToken = ({ id, items_count, total, user, created_at }) => (
  <div className="token">
    <strong>Batch #{ id }</strong> ({ items_count } items, { numeral(total).format('$0.00') })<br />
    { user.full_name } on { moment(created_at).format('MM/DD/YYYY') }
  </div>
)

BatchToken.propTypes = {
  created_at: PropTypes.object,
  id: PropTypes.number,
  items_count: PropTypes.number,
  total: PropTypes.number,
  user: PropTypes.object
}

export default BatchToken
