import { Button, Chart } from 'maha-admin'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

class Performance extends React.Component {

  static propTypes = {
    event: PropTypes.object
  }

  render() {
    const { event } = this.props
    const { registrations_count, tickets_count, ticket_types, waitings_count } = event
    const { revenue, first_registration, last_registration } = event
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
              Registrations
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(registrations_count, '') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Waiting List
            </div>
            <div className="crm-report-metric-value">
              <Button { ...this._getButton(waitings_count, '?$filter[was_converted][$eq]=true') } />
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Tickets
            </div>
            <div className="crm-report-metric-value">
              { tickets_count }
            </div>
          </div>
          <div className="crm-report-metric">
            <div className="crm-report-metric-title">
              Revenue
            </div>
            <div className="crm-report-metric-value">
              { numeral(revenue).format('0.00') }
            </div>
          </div>
        </div>
        <div className="crm-report-table">
          <table className="ui unstackable table">
            <tbody>
              { ticket_types.map((ticket_type, index) => (
                <tr key={`ticket_type_${index}`}>
                  <td>
                    { ticket_type.name } { ticket_type.remaining === 0 &&
                      <span className="alert">SOLD OUT</span>
                    }
                  </td>
                  <td className="right aligned">
                    { ticket_type.tickets_count } { ticket_type.total_tickets &&
                      <span> / { ticket_type.total_tickets }</span>
                    }
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  First Registration
                </td>
                <td className="right aligned">
                  { first_registration ? moment(first_registration).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
              <tr>
                <td>
                  Last Registration
                </td>
                <td className="right aligned">
                  { last_registration ? moment(last_registration).format('MM/DD/YY hh:mmA') : 'N/A' }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  _getButton(label, query) {
    const { event } = this.props
    return {
      label,
      className: 'link',
      route: `/admin/events/events/${event.id}/registrations`
    }
  }

  _getChart() {
    const { event } = this.props
    return {
      endpoint: `/api/admin/events/events/${event.id}/performance`,
      started_at: event.created_at
    }
  }

}

export default Performance
