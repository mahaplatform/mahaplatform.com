import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import moment from 'moment'
import React from 'react'

const ImportToken = (item) => (
  <div className="import-token">
    <div className="import-token-icon">
      <img src={ `/admin/images/services/${item.service}.png` } />
    </div>
    <div className="import-token-label">
      <strong>{item.name || item.asset.original_file_name}</strong> ({ pluralize('record', item.item_count, true) })<br />
      by {item.user.full_name}<br />
      on { moment(item.created_at).format('MMM DD, YYYY [@] h:mma') }
    </div>
  </div>
)

ImportToken.propTypes = {
  item: PropTypes.object
}

export default ImportToken
