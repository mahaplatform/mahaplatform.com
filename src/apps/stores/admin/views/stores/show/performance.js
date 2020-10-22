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
    const { store } = this.props
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Registrations
        </div>
        <div className="crm-report-header">
          <Chart { ...this._getChart() } />
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Orders
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getOrders(store.orders_count) } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Active Carts
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getCarts(store.active_count, 'active') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Anbandoned Carts
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getCarts(store.abandoned_count, 'abandoned') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Revenue
            </div>
            <div className="crm-report-metric-value">
              { numeral(store.revenue).format('0.00') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              <tr>
                <td>
                  First Order
                </td>
                <td className="right aligned">
                  { store.first_order ? moment(store.first_order).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
              <tr>
                <td>
                  Last Order
                </td>
                <td className="right aligned">
                  { store.last_order ? moment(store.last_order).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getCarts(label, query) {
    const { store } = this.props
    return {
      label,
      className: 'link',
      route: `/admin/stores/stores/${store.id}/carts`
    }
  }

  _getChart() {
    const { store } = this.props
    return {
      endpoint: `/api/admin/stores/stores/${store.id}/performance`,
      started_at: store.created_at
    }
  }

  _getOrders(label, query) {
    const { store } = this.props
    return {
      label,
      className: 'link',
      route: `/admin/stores/stores/${store.id}/orders`
    }
  }

}

export default Performance
