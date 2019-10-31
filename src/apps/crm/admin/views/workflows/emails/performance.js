import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    email: PropTypes.object
  }

  render() {
    const { email } = this.props
    return (
      <div className="crm-report">
        <div className="crm-report-title">
          Deliveries
        </div>
        <div className="crm-report-metrics">
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Sent
            </div>
            <div className="crm-report-metric-value">
              { email.sent }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Open Rate
            </div>
            <div className="crm-report-metric-value">
              { this._getRate(email.opened, email.delivered) }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Click Rate
            </div>
            <div className="crm-report-metric-value">
              { this._getRate(email.clicked, email.delivered) }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              <tr>
                <td>Delivered</td>
                <td className="right aligned">
                  { email.delivered }
                </td>
              </tr>
              <tr>
                <td>Opened</td>
                <td className="right aligned">
                  { email.opened }
                </td>
              </tr>
              <tr>
                <td>Complained</td>
                <td className="right aligned">
                  { email.complained }
                </td>
              </tr>
              <tr>
                <td>Clicked</td>
                <td className="right aligned">
                  { email.clicked }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getRate(numerator, denomenator) {
    if(denomenator === 0) return '0%'
    return numeral(numerator / denomenator).format('0.0%')
  }

}

export default Performance
