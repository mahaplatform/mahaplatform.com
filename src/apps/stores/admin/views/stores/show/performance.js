import { Button, Chart } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  render() {
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Registrations
        </div>
        <div className="crm-report-header">
          <Chart { ...this._getChart() } />
        </div>
      </div>
    )
  }

  _getChart() {
    const { store } = this.props
    return {
      endpoint: `/api/admin/stores/stores/${store.id}/performance`,
      started_at: store.created_at
    }
  }

}

export default Performance
